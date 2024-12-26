from rest_framework import serializers
from .models import Room, Topic, Message, User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)  # password is write only
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data.get('username', ''),
        )
        user.set_password(validated_data['password'])   # Hash   the password
        user.save()
        return user


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

