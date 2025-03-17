from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ULBViewSet, RoleViewSet, UserViewSet, UserDocumentViewSet

router = DefaultRouter()
router.register(r'ulbs', ULBViewSet)
router.register(r'roles', RoleViewSet)
router.register(r'users', UserViewSet)
router.register(r'documents', UserDocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 