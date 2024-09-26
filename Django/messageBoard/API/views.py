from rest_framework.decorators import api_view
from rest_framework.response import Response
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


