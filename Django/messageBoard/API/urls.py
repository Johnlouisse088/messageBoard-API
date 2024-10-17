from django.urls import path
from . import views

urlpatterns = [
    path("routes/", views.routes, name="routes"),

    path("", views.home, name="home"),

    path("rooms/<str:pk>/", views.room, name="room"),
    path("rooms/create/", views.room_create, name="room_create"),

    path("topics/", views.topics, name="topics"),
]
