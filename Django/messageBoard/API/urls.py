from django.urls import path
from . import views

urlpatterns = [
    path("routes/", views.routes, name="routes"),

    path("", views.home, name="home")
]

