from rest_framework import permissions


class HasULBPermission(permissions.BasePermission):
    """
    Custom permission to only allow users to access their ULB's data.
    """
    def has_permission(self, request, view):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return False
            
        # Allow superusers full access
        if request.user.is_superuser:
            return True
            
        # Check if user has ULB assigned
        return bool(request.user.ulb)

    def has_object_permission(self, request, view, obj):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return False
            
        # Allow superusers full access
        if request.user.is_superuser:
            return True
            
        # Check if object belongs to user's ULB
        return obj.ulb == request.user.ulb

class HasModulePermission(permissions.BasePermission):
    """
    Custom permission to check if user has permission for specific module.
    """
    def has_permission(self, request, view):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return False
            
        # Allow superusers full access
        if request.user.is_superuser:
            return True
            
        # Check if user has a role assigned
        if not request.user.role:
            return False
            
        module = getattr(view, 'module_name', None)
        if not module:
            return False
            
        return module in request.user.role.permissions.get('modules', []) 