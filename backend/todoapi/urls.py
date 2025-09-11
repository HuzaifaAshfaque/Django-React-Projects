from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.todo_list, name='todo'),
    path('<int:pk>/', views.todo_list_details, name='todo_list_details')
]

urlpatterns = format_suffix_patterns(urlpatterns)
