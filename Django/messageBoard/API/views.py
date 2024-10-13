from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Room, Topic, Message, User
from .serializers import RoomSerializer, TopicSerializer, MessageSerializer, UserSerializer

# Create your views here.

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
        room__icontains = searched_room
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


@api_view(['GET'])
def room(request, pk):
    room = Room.objects.get(id=pk)
    messages = room.message_set.all()
    participants = room.participants.all()

    room_serializer = RoomSerializer(room)
    messages_serializer = MessageSerializer(messages, many=True)
    participants_serializer = UserSerializer(participants, many=True)

    context = {
        "rooms": room_serializer.data,
        "messages": messages_serializer.data,
        "participants": participants_serializer.data
    }

    return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
def room_create(request):
    # Request payloads
    req_name = request.data.get("room")
    req_topic = request.data.get("topic")
    req_description = request.data.get("description")
    req_user = 1

    # get topic or create new topic
    topic, created = Topic.objects.get_or_create(name=req_topic)

    # request data
    request_data = {
        "user": req_user,
        "room": req_name,
        "topic": topic.id,
        "description": req_description
    }

    # serialize the request payload
    room_serializer = RoomSerializer(data=request_data)

    if room_serializer.is_valid():
        room_serializer.save()
        return Response(room_serializer.data, status=status.HTTP_200_OK)
    return Response(room_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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