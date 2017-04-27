from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
    DestroyModelMixin)
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserSerializer


class UserViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin,
                  UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(creator=self.request.user)
