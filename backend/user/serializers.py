from rest_framework import serializers
from .models import CustomUser, TeacherProfile, StudentProfile


# -----------------
# User Serializer
# -----------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "email", "username", "is_teacher", "is_student")


# -----------------
# Login Serializer
# -----------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


# -----------------
# Register Serializer
# -----------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        required=True,
        error_messages={
            "unique": "Email already exists. Please use a different email."
        }
    )

    class Meta:
        model = CustomUser
        fields = ("id", "email", "username", "password", "is_teacher", "is_student")

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists. Please use a different email.")
        return value
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            is_teacher=validated_data.get("is_teacher", False),
            is_student=validated_data.get("is_student", True),
            is_active=False,   # 🚨 inactive until email verification

        )
        return user
