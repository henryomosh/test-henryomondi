from rest_framework.test import APITestCase
from rest_framework import status
from django.shortcuts import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from apps.hello.models import User, Expectation


class HelloAPITest(APITestCase):
    def test_ping(self):
        """
        endpoint is accessible and always return same status
        """
        response = self.client.get(reverse("api_hello:ping"))
        self.assertTrue(response.json()["status"])


class AccountTest(APITestCase):
    def test_register_user(self):
        """
        Can can create new account
        """
        url = reverse("api_hello:register-list")
        data = {"username": "testuser", "email": "testuser@email.com", "password": "pas$word"}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_supersuser_action(self):
        """
        Admin can perfom superuser actions
        """
        author = User.objects.create(username="testuser", email="testuser@email.com", password="pas$word")
        expectation = Expectation.objects.create(
            author=author, expect="work done", done_at=timezone.now() + timezone.timedelta(hours=1)
        )
        url = reverse("admin:hello_expectation_change", args=(expectation.id,))
        admin = User.objects.create_superuser(username="adminuser", email="adminuser@email.com", password="pas$word")
        self.client.force_login(user=admin)
        response = self.client.post(url, {"expect": "changes"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_user(self):
        """
        Can get current user object by email
        """
        client = APIClient()
        url = reverse("api_hello:users-list")
        user = User.objects.create(username="testuser", email="testuser@email.com", password="pas$word")
        client.force_authenticate(user=user)
        response = client.get(url, {"query_prams": {"email": user.email}}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LoginTest(AccountTest):
    def test_authenticate_user(self):
        """
        Existing users with proper credentials are authenticated
        """
        url = reverse("api_hello:login-list")
        User.objects.create_user(username="testuser", email="testuser@email.com", password="pas$word")
        data = {"email": "testuser@email.com", "password": "pas$word"}

        response = self.client.post(url, data, format="json")
        self.assertTrue(self.client.login(email="testuser@email.com", password="pas$word"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class RefreshTokenTest(AccountTest):
    def test_refresh_token(self):
        """
        Issued refresh token obtains access token on refresh
        """
        url = reverse("api_hello:login-list")
        token_url = reverse("api_hello:token-refresh")
        User.objects.create_user(username="testuser", email="testuser@email.com", password="pas$word")
        data = {"email": "testuser@email.com", "password": "pas$word"}
        response = self.client.post(url, data, format="json")
        refresh_token = response.data["refresh"]
        response = self.client.post(token_url, {"refresh": refresh_token}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ExpectationTest(APITestCase):
    def test_retrieve_expectation(self):
        """
        we can retrieve  expectations
        """
        client = APIClient()
        url = reverse("api_hello:expectations-list")
        author = User.objects.create(username="testuser", email="testuser@email.com", password="pas$word")
        Expectation.objects.create(author=author, expect="work done", done_at="2022-10-08 20:22")
        client.force_authenticate(user=author)

        response = client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_expectation(self):
        """
        Can retrieve  expectations
        """
        client = APIClient()
        url = reverse("api_hello:expectations-list")
        author = User.objects.create_user(username="testuser", email="testuser@email.com", password="pas$word")
        data = {"author": "testuser", "expect": "work done", "done_at": timezone.now() + timezone.timedelta(hours=1)}
        client.force_authenticate(user=author)
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Expectation.objects.count(), 1)
        self.assertEqual(Expectation.objects.get().author.username, "testuser")

    def test_filter_expectation(self):
        """
        Can get current user expectations
        """
        client = APIClient()
        url = reverse("api_hello:expectations-list")
        author = User.objects.create_user(username="testuser", email="testuser@email.com", password="pas$word")
        Expectation.objects.create(author=author, expect="unit tests", done_at="2022-10-12T15:49:00.000Z")
        client.force_authenticate(user=author)
        response = client.get(url, {"author": author.username}, format="json")
        self.assertEqual(response.status_code, 200)
