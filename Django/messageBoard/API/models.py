from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=200, null=True)
    email = models.EmailField(unique=True, null=False,)
    bio = models.TextField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return str(self.email)


class Topic(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return str(self.name)


class Room(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    room = models.CharField(max_length=85, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    participants = models.ManyToManyField(User, related_name='participated_rooms')

    def __str__(self):
        return str(self.room)


class Message(models.Model):
    room = models.ForeignKey(Room, null=True, on_delete=models.CASCADE)
    message = models.CharField(max_length=85, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.message)
