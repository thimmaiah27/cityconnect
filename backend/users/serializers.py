from rest_framework import serializers
from .models import CustomUser, Role, ULB, UserDocument

class ULBSerializer(serializers.ModelSerializer):
    class Meta:
        model = ULB
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDocument
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    documents = UserDocumentSerializer(many=True, read_only=True)
    
    class Meta:
        model = CustomUser
        exclude = ('password',)
        read_only_fields = ('last_login', 'date_joined', 'created_at', 'updated_at')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'phone_number', 'password', 'confirm_password',
                 'first_name', 'last_name', 'gender', 'date_of_birth', 'address', 'pincode')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user 