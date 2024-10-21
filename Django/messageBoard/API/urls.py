from django.urls import path
from . import views

urlpatterns = [
    path("routes/", views.routes, name="routes"),

    path("", views.home, name="home"),

    path("rooms/<str:pk>/", views.room, name="room"),
    path("rooms/create/", views.create_room, name="create_room"),

    path("topics/", views.topics, name="topics"),

    path("messages/delete/<int:id>/", views.delete_message, name="delete_message")
]
