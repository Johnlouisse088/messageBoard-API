from django.urls import path, include
from . import views

urlpatterns = [
    path("routes/", views.routes, name="routes")
]