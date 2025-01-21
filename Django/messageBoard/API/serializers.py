from rest_framework import serializers
from .models import Room, Topic, Message, User


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)  # password is writing only
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'bio', 'username', 'password', 'image']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            bio=validated_data['bio'],
            name=validated_data.get('name', ''),
            image=validated_data.get('image', ''),
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
        fields = ['id', 'room', 'message', 'user']

    def to_representation(self, instance):
        """
        Customize the output to return nested objects for `user`, `topic`, and `participants`.
        """
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data  # Include nested user details
        return representation

class RoomSerializer(serializers.ModelSerializer):

    # Request - It will expect an ID (not objects)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all())

    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'user', 'topic', 'participants']

    # Response -  Override the output by the nested objects (not the ID only)
    def to_representation(self, instance):
        """
        Customize the output to return nested objects for `user`, `topic`, and `participants`.
        """
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data  # Include nested user details
        representation['topic'] = TopicSerializer(instance.topic).data  # Include nested topic details
        representation['participants'] = UserSerializer(instance.participants, many=True).data  # Include nested participants details
        return representation







