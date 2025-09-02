from django.urls import path
from .views import hello_world, custom_message, hello_name

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('hello/<str:name>/', hello_name, name='hello_name'),
    path('message/', custom_message, name='custom_message'),
]
