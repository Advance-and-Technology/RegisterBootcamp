from django.urls import path
from .views import register_applicant

urlpatterns = [
    path('register/', register_applicant, name='register_applicant'),
]
