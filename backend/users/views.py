from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Role, ULB, UserDocument
from .serializers import (
    CustomUserSerializer, RoleSerializer, ULBSerializer,
    UserDocumentSerializer, UserRegistrationSerializer
)

# Create your views here.

class ULBViewSet(viewsets.ModelViewSet):
    queryset = ULB.objects.all()
    serializer_class = ULBSerializer
    permission_classes = [permissions.IsAuthenticated]

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserRegistrationSerializer
        return self.serializer_class

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_superuser:
            # Filter users by ULB if the user is not a superuser
            queryset = queryset.filter(ulb=self.request.user.ulb)
        return queryset

    @action(detail=False, methods=['get'])
    def officials(self, request):
        officials = self.get_queryset().filter(role__is_official=True)
        serializer = self.get_serializer(officials, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def citizens(self, request):
        citizens = self.get_queryset().filter(role__is_official=False)
        serializer = self.get_serializer(citizens, many=True)
        return Response(serializer.data)

class UserDocumentViewSet(viewsets.ModelViewSet):
    queryset = UserDocument.objects.all()
    serializer_class = UserDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserDocument.objects.filter(user=self.request.user)
