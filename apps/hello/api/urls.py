from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import SimpleRouter

from apps.hello.api.views import PingView, RegistrationViewSet, LoginViewSet, UserViewSet, ExpectationViewSet

app_name = "api_hello"

route = SimpleRouter()

# AUTHENTICATION
route.register(r"register", RegistrationViewSet, basename="register")
route.register(r"login", LoginViewSet, basename="login")

route.register(r"users", UserViewSet, basename="users")
route.register(r"expectations", ExpectationViewSet, basename="expectations")

urlpatterns = [
    path("ping/", PingView.as_view(), name="ping"),
    path("token/", TokenObtainPairView.as_view(), name="obtain-token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    *route.urls,
]
