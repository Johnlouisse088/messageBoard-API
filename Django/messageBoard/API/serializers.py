from rest_framework import serializers
from .models import Room, Topic, Message, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'room', 'message']


class RoomSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    topic = TopicSerializer()
    participants = UserSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'created', 'updated', 'user', 'topic', 'participants']

