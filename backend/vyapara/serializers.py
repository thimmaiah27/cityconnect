from rest_framework import serializers
from .models import Applicant, TradeLicense
from users.serializers import CustomUserSerializer, ULBSerializer

class ApplicantSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    updated_by = CustomUserSerializer(read_only=True)
    ulb = ULBSerializer(read_only=True)

    class Meta:
        model = Applicant
        fields = '__all__'

class TradeLicenseSerializer(serializers.ModelSerializer):
    applicants = ApplicantSerializer(many=True)
    created_by = CustomUserSerializer(read_only=True)
    updated_by = CustomUserSerializer(read_only=True)
    ulb = ULBSerializer(read_only=True)
    
    class Meta:
        model = TradeLicense
        fields = '__all__'

    def create(self, validated_data):
        applicants_data = validated_data.pop('applicants')
        trade_license = TradeLicense.objects.create(**validated_data)
        for applicant_data in applicants_data:
            applicant = Applicant.objects.create(**applicant_data)
            trade_license.applicants.add(applicant)
        return trade_license 