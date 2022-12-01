from django.contrib import admin
from apps.hello.models import Expectation, User

admin.site.register(User)
admin.site.register(Expectation)
