from django.db import models
from django.contrib.auth.models import User
from users.models import CustomUser, ULB
from django.utils import timezone

class Applicant(models.Model):
    name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    photo = models.ImageField(upload_to='applicant_photos/')
    pan_no = models.CharField(max_length=10)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    ulb = models.ForeignKey(ULB, on_delete=models.PROTECT)
    created_by = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name='created_applicants')
    updated_by = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name='updated_applicants')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class TradeLicense(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ISSUED', 'Issued'),
        ('EXPIRED', 'Expired'),
        ('CANCELLED', 'Cancelled'),
        ('DUE', 'Due Renewal'),
    ]

    license_no = models.CharField(max_length=50, unique=True)
    applicants = models.ManyToManyField(Applicant, related_name='trade_licenses')
    shop_name = models.CharField(max_length=255)
    trade_type = models.CharField(max_length=100)
    trade_fees = models.DecimalField(max_digits=10, decimal_places=2)
    shop_address = models.TextField()
    building_ownership = models.CharField(max_length=20)
    building_owner_name = models.CharField(max_length=255)
    building_owner_phone = models.CharField(max_length=15)
    
    # Documents
    id_proof = models.FileField(upload_to='license_documents/id_proofs/')
    building_proof = models.FileField(upload_to='license_documents/building_proofs/')
    other_documents = models.FileField(upload_to='license_documents/others/', blank=True, null=True)
    
    # Status and dates
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    issue_date = models.DateField(null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    ulb = models.ForeignKey(ULB, on_delete=models.PROTECT)
    created_by = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name='created_licenses')
    updated_by = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name='updated_licenses')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.license_no
