from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    own = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'iban', 'own')
        read_only_fields = ('id', )

    def get_own(self, instance):
        return instance.creator == self.context['auth_user']
