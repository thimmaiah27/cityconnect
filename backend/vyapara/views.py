from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db import models
from .models import Applicant, TradeLicense
from .serializers import ApplicantSerializer, TradeLicenseSerializer
from users.permissions import HasULBPermission, HasModulePermission
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [HasULBPermission, HasModulePermission]
    module_name = 'vyapara'

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Applicant.objects.all()
        return Applicant.objects.filter(ulb=self.request.user.ulb)

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            updated_by=self.request.user,
            ulb=self.request.user.ulb
        )

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

class TradeLicenseViewSet(viewsets.ModelViewSet):
    queryset = TradeLicense.objects.all()
    serializer_class = TradeLicenseSerializer
    permission_classes = [HasULBPermission, HasModulePermission]
    module_name = 'vyapara'
    parser_classes = (MultiPartParser, FormParser)  # Allow file uploads

    def get_queryset(self):
        if self.request.user.is_superuser:
            return TradeLicense.objects.all()
        return TradeLicense.objects.filter(ulb=self.request.user.ulb)

    def perform_create(self, serializer):
        # Create the TradeLicense instance
        trade_license = serializer.save(
            created_by=self.request.user,
            updated_by=self.request.user,
            ulb=self.request.user.ulb
        )
        
        # Handle applicants
        applicants_data = self.request.data.get('applicants', [])
        for applicant_data in applicants_data:
            applicant_data['ulb'] = self.request.user.ulb.id  # Set ULB for the applicant
            applicant_data['created_by'] = self.request.user.id  # Set creator
            applicant_data['updated_by'] = self.request.user.id  # Set updater
            applicant_serializer = ApplicantSerializer(data=applicant_data)
            if applicant_serializer.is_valid():
                applicant_serializer.save()
                trade_license.applicants.add(applicant_serializer.instance)  # Associate applicant with license
            else:
                return Response(applicant_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(TradeLicenseSerializer(trade_license).data, status=status.HTTP_201_CREATED)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        licenses = self.get_queryset().filter(
            models.Q(license_no__icontains=query) |
            models.Q(shop_name__icontains=query) |
            models.Q(applicants__name__icontains=query)
        ).distinct()
        serializer = self.get_serializer(licenses, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        queryset = self.get_queryset()
        total = queryset.count()
        pending = queryset.filter(status='PENDING').count()
        issued = queryset.filter(status='ISSUED').count()
        expired = queryset.filter(status='EXPIRED').count()
        
        return Response({
            'total': total,
            'pending': pending,
            'issued': issued,
            'expired': expired
        })
