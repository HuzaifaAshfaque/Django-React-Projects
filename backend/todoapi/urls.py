from django.urls import path
from . import views

urlpatterns = [
    path('', views.todo_list, name='todo'),
    path('<int:pk>/', views.todo_list_details, name='todo_list_details')
]
