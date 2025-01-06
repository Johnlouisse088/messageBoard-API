from django.contrib.auth import authenticate, login, logout
from django.http import Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Room, Topic, Message, User
from .serializers import RoomSerializer, TopicSerializer, MessageSerializer, UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.username
        token['email'] = user.email
        token['bio'] = user.bio

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def routes(request):
    routes = [
        {
            'endpoint': '/',
            'method': 'GET',
            'body': 'None',
            'description': 'homepage'
        },
        {
            'endpoint': '/login',
            'method': 'POST',
            'body': 'None',
            'description': 'log-in'
        },
        {
            'endpoint': '/logout',
            'method': 'POST',
            'body': 'None',
            'description': 'log-out'
        },
        {
            'endpoint': '/signup',
            'method': 'POST',
            'body': 'None',
            'description': 'sign-up'
        },
        {
            'endpoint': '/settings/id',
            'method': 'PUT',
            'body': 'None',
            'description': 'profile update'
        },
        {
            'endpoint': '/profile/id',
            'method': 'GET',
            'body': 'None',
            'description': 'profile description'
        },
        {
            'endpoint': '/topics',
            'method': 'GET',
            'body': 'None',
            'description': 'view all topics'
        },
        {
            'endpoint': '/room/id',
            'method': 'GET',
            'body': 'None',
            'description': 'room description'
        },
        {
            'endpoint': '/room/create',
            'method': 'POST',
            'body': 'None',
            'description': 'room creation'
        },
        {
            'endpoint': '/room/update/id',
            'method': 'PUT',
            'body': 'None',
            'description': 'room update'
        },
        {
            'endpoint': '/room/delete/id',
            'method': 'DELETE',
            'body': 'None',
            'description': 'room delete'
        },
        {
            'endpoint': '/message/delete/id',
            'method': 'DELETE',
            'body': 'None',
            'description': 'message delete'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def home(request):
    # searched_room = request.GET.get('searchedRoom') if request.GET.get('searchedRoom') is not None else ''
    searched_room = request.GET.get('searchedRoom') or ''

    # Models
    topics = Topic.objects.all()
    messages = Message.objects.all()
    rooms = Room.objects.filter(
        name__icontains = searched_room
    )
    # Serializers
    room_serializer = RoomSerializer(rooms, many=True)
    topic_serializer = TopicSerializer(topics, many=True)
    message_serializer = MessageSerializer(messages, many=True)

    # Context
    context = {
        'rooms': room_serializer.data,
        'topics': topic_serializer.data,
        'messages': message_serializer.data
    }

    # Response body
    return Response(context)


@api_view(['POST'])
def login_view(request):
    req_email = request.data.get("email")
    req_password = request.data.get("password")

    user = authenticate(
        email=req_email,
        password=req_password
    )

    if user is not None:
        login(request, user)
        return Response({"message": "success"}, status=status.HTTP_200_OK)
    return Response({"message": "denied"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    user = request.user
    print("test---- ", user.is_authenticated)
    return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def check_login(request):
    print("TEsttt")
    user = request.user
    print("testt2 ", user)
    if user.is_authenticated:
        print("testt3")
        return Response({"message": "You already logged in"}, status=status.HTTP_200_OK)
    print("test4")
    return Response({"message": "You still didn't logged in"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register(request):
    user = UserSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def profile(request):
    user = request.user
    user_room = user.room_set.all()
    user_room_serializer = RoomSerializer(user_room, many=True)

    context = {
        'user_room': user_room_serializer.data
    }

    return Response(context, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_profile(request, profile_id):
    user_info = User.objects.get(id=profile_id)

    user_info.name = request.data.get('name', user_info.name)
    user_info.email = request.data.get('email', user_info.email)
    user_info.bio = request.data.get('bio', user_info.bio)

    user_info.save()

    user_serializer = UserSerializer(user_info)

    return Response(user_serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def room(request, pk):
    if request.method == 'GET':
        room = Room.objects.get(id=pk)
        messages = room.message_set.all()

        room_serializer = RoomSerializer(room)
        messages_serializer = MessageSerializer(messages, many=True)
        context = {
            "room": room_serializer.data,
            "messages": messages_serializer.data
        }
        return Response(context, status=status.HTTP_200_OK)
    else:
        req_room = request.data.get("room")
        req_message = request.data.get("message")
        req_user = request.user.id

        print("req_user: ", req_user)

        request_data = {
            "user": req_user,
            "room": req_room,
            "message": req_message
        }

        message = MessageSerializer(data=request_data)
        if message.is_valid():
            message.save()
            return Response(message.data, status=status.HTTP_201_CREATED)
        return Response(message.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])   # Check if the user is authenticated
def create_room(request):
    # Request payloads
    req_name = request.data.get("name")
    req_topic = request.data.get("topic")
    req_description = request.data.get("description")
    req_user = request.user.id        # return id of the user

    # get topic or create new topic
    topic, created = Topic.objects.get_or_create(name=req_topic)

    # request data
    request_data = {
        "user": req_user,
        "name": req_name,
        "topic": topic.id,
        "description": req_description
    }

    # serialize the request payload
    room_serializer = RoomSerializer(data=request_data)

    if room_serializer.is_valid():
        room_serializer.save()
        return Response(room_serializer.data, status=status.HTTP_200_OK)
    return Response(room_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_room(request, room_id):

    room = Room.objects.get(id=room_id)
    req_topic = request.data.get('topic')
    topic, _ = Topic.objects.get_or_create(name=req_topic)

    room.name = request.data.get('name', room.name)
    room.topic = topic
    room.description = request.data.get('description', room.description)

    req_participants = request.data.get('participants', [])
    if req_participants:
        room.participants.set(req_participants)

    room.save()

    room_serializer = RoomSerializer(room)
    return Response(room_serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_room(request, room_id):
    deleting_room = Room.objects.get(id=room_id)
    deleting_room.delete()
    return Response("Deleted")


@api_view(['GET'])
def topics(request):
    searched_topic = request.GET.get("searchedTopic") or ""
    topics = Topic.objects.filter(
        name__icontains=searched_topic
    )

    list_topics = []   # sample [{name: Django, rooCount:2}, {...}]
    for topic in topics:
        topic_name = topic.name
        topic_count = topic.room_set.all().count()
        list_topics.append({
            "name": topic_name,
            "roomCount": topic_count
        })

    return Response(list_topics, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_message(request, id):
    # If the message object doesn't exist in database, it will raise 404
    message = get_object_or_404(Message, id=id)

    # Serialize the message before deletion if needed
    message_serializer = MessageSerializer(message)

    # Delete the message
    message.delete()

    # Return a response confirming deletion
    return Response({'message': 'Message deleted successfully', 'deleted_message': message_serializer.data},
                    status=status.HTTP_200_OK)


