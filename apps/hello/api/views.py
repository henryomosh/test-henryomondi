from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import viewsets, filters

from apps.hello.api.serializers import UserSerializer, LoginSerializer, RegisterSerializer, ExpectationSerializer
from apps.hello.models import User, Expectation


class PingView(views.APIView):
    permission_classes = (AllowAny,)

    def get(self, request, **kwargs):
        return Response({"status": True}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = User.objects.all()
        email = self.request.query_params.get("email")
        if email:
            qs = qs.filter(email=email)
        return qs


class LoginViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ["post"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ExpectationViewSet(viewsets.ModelViewSet):
    serializer_class = ExpectationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        qs = Expectation.objects.all()
        author = self.request.query_params.get("author")
        if author:
            qs = qs.filter(author__username__contains=author)
        return qs

    def create(self, request, *args, **kwargs):
        username = request.data["author"]
        author = User.objects.get(username=username)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Expectation.objects.filter(author=author).update(current=False)
        serializer.save(author=author)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
