from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate
from rest_framework import status
from .utils import generate_token, verify_token
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from django.shortcuts import redirect


# -----------------
# Register View
# -----------------

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(is_active=False)

        uid, token = generate_token(user)
        verify_url = f"http://localhost:5173/verify-email/{uid}/{token}/"

        try:
            send_mail(
                subject="Verify your email",
                message=f"Hi {user.username},\n\nClick the link to verify your account:\n{verify_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
            )
        except Exception as e:
            user.delete()
            return Response(
                {"success": False, "message": f"Registration failed. Could not send email. {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {"success": True, "message": "Registration successful! Check your email to verify your account before logging in."},
            status=status.HTTP_201_CREATED
        )
# -----------------
# Verify Email View 
# -----------------
class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, uid, token):
        user = verify_token(uid, token, CustomUser)
        if user:
            user.is_active = True
            user.save()
            # return JSON to React
            return Response({
                "verified": True,
                "message": "Your email has been verified. You can now login."
            })
        return Response(
            {"verified": False, "message": "Invalid or expired verification link."},
            status=status.HTTP_400_BAD_REQUEST
        )
# -----------------
# Login View (JWT)
# -----------------
class LoginView(generics.GenericAPIView):
    serializer_class = None
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        # Use Django's built-in authenticate (works with USERNAME_FIELD)
        user = authenticate(request, email=email, password=password)
        print(user)
        if user is None:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })
    

class TeacherDashboardView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_teacher:
            return Response({"error": "Forbidden"}, status=403)
        return Response({"message": f"Welcome {user.username} to Teacher Dashboard!"})