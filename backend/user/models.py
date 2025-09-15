

# Create your models here.
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


# -----------------
# Custom Admin Model
# -----------------
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("role", "admin")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)# 👈 custom flag
        extra_fields.setdefault("is_teacher", False)
        extra_fields.setdefault("is_student", False)  # 👈 not a student

        return self.create_user(email, username, password, **extra_fields)



# -----------------
# Custom User Model
# -----------------
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Roles
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("teacher", "Teacher"),
        ("student", "Student"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="student")

    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # keeps username as required, you can remove if not needed
    
    objects = CustomUserManager()   # 👈 tell Django to use your custom manager

    def __str__(self):
        return self.email


# -----------------
# Subject Model
# -----------------
class Subject(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# -----------------
# Teacher Profile
# -----------------
class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="teacher_profile")
    subjects = models.ManyToManyField(Subject, related_name="teachers")  # many subjects per teacher
    qualification = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Teacher: {self.user.username} ({self.user.email})"


# -----------------
# Student Profile
# -----------------
class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="student_profile")
    grade = models.CharField(max_length=50)
    roll_number = models.CharField(max_length=20, unique=True)


    def save(self, *args, **kwargs):
        if not self.roll_number:
            last_roll = StudentProfile.objects.all().count() + 1
            self.roll_number = f"R{last_roll:03d}"   # e.g., R001, R002
        super().save(*args, **kwargs)


    def __str__(self):
        return f"Student: {self.user.username} ({self.user.email})"
