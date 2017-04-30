from django.conf import settings
from oauth2client import client, crypt
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)


class GoogleAuthentication(TokenAuthentication):

    def authenticate_credentials(self, token):
        User = get_user_model()
        try:
            idinfo = client.verify_id_token(
                token, settings.GOOGLE_CLIENT_ID)

            auth_domains = [
                'accounts.google.com',
                'https://accounts.google.com']
            if idinfo['iss'] not in auth_domains:
                raise crypt.AppIdentityError("Wrong issuer.")

            user = User.objects.get(username=idinfo['email'])
            return (user, token)
        except (crypt.AppIdentityError, User.DoesNotExist):
            raise AuthenticationFailed('Invalid token.')


class CustomSessionAuthentication(SessionAuthentication):

    def authenticate_header(self, request):
        return 'OAuth realm="api"'
