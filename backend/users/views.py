from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin,
    DestroyModelMixin)
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer
from .permissions import IsCreatorOrReadOnly


class UserViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin,
                  UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated, IsCreatorOrReadOnly)
    serializer_class = UserSerializer
    pagination_class = None
    ordering = ('-id',)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_context(self):
        return {'auth_user': self.request.user}

    def get_queryset(self):
        return User.objects.all()
