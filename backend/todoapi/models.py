from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=200)  # short description
    description = models.TextField(blank=True, null=True)  # optional details
    completed = models.BooleanField(default=False)  # done or not
    created_at = models.DateTimeField(auto_now_add=True)  # auto timestamp
    updated_at = models.DateTimeField(auto_now=True)  # auto update on edit

    def __str__(self):
        return self.title