from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

from apps.hello.models import Expectation, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = ("id",)


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["user"] = UserSerializer(self.user).data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


class RegisterSerializer(UserSerializer):
    username = serializers.CharField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all(), message="Username already exists!")]
    )
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all(), message="Email already exists!")]
    )
    password = serializers.CharField(
        max_length=40, min_length=6, write_only=True, required=True, validators=[validate_password]
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        read_only_fields = ("id",)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ExpectationSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    expect = serializers.CharField(required=True)
    done_at = serializers.DateTimeField(required=True)

    class Meta:
        model = Expectation
        fields = ["id", "author", "expect", "done", "done_at", "current"]
        read_only_fields = ("id",)

    def validate_done_at(self, date):
        if date < timezone.now():
            raise serializers.ValidationError("This field cannot be past time.")
        return date

    def create(self, validated_data):
        expectation = Expectation.objects.create(**validated_data)
        return expectation
