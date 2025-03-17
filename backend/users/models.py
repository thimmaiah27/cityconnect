from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone

class ULB(models.Model):
    """Urban Local Body Model"""
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=[
        ('CORPORATION', 'Municipal Corporation'),
        ('MUNICIPALITY', 'Municipality'),
        ('PANCHAYAT', 'Panchayat')
    ])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Role(models.Model):
    """User Roles Model"""
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True)
    permissions = models.JSONField(default=dict)
    is_official = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    """Custom User Model"""
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    ]

    # Basic Info
    phone_regex = RegexValidator(
        regex=r'^\d{10}$',
        message="Phone number must be 10 digits"
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=10, unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True)
    
    # Address
    address = models.TextField(blank=True)
    pincode = models.CharField(max_length=6, blank=True)
    
    # Official Details
    employee_id = models.CharField(max_length=50, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    
    # Relations
    role = models.ForeignKey(Role, on_delete=models.PROTECT, null=True)
    ulb = models.ForeignKey(ULB, on_delete=models.PROTECT, null=True)
    
    # System Fields
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_full_name()} ({self.phone_number})"

class UserDocument(models.Model):
    """User Documents Model"""
    DOCUMENT_TYPES = [
        ('AADHAR', 'Aadhar Card'),
        ('PAN', 'PAN Card'),
        ('VOTER', 'Voter ID'),
        ('DL', 'Driving License'),
        ('OTHER', 'Other')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    document_number = models.CharField(max_length=50)
    document_file = models.FileField(upload_to='user_documents/')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'document_type']
