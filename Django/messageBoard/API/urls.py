from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("routes/", views.routes, name="routes"),

    path("", views.home, name="home"),

    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("check_login/", views.check_login, name="check_login"),
    path("register/", views.register, name="register"),

    path("profile/<int:profile_id>/", views.profile, name="profile"),
    path("profile/update/<int:profile_id>/", views.update_profile, name="update_profile"),

    path("rooms/create/", views.create_room, name="create_room"),
    path("rooms/update/<int:room_id>/", views.update_room, name="update_room"),
    path("rooms/delete/<int:room_id>/", views.delete_room, name="delete_room"),
    path("rooms/<str:pk>/", views.room, name="room"),


    path("topics/", views.topics, name="topics"),

    path("messages/delete/<int:id>/", views.delete_message, name="delete_message")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
