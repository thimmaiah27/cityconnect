from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicantViewSet, TradeLicenseViewSet

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet)
router.register(r'licenses', TradeLicenseViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 