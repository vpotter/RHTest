from django.conf import settings
from oauth2client import client, crypt
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)


class GoogleAuthentication(TokenAuthentication):

    def authenticate(self, request):
        self.request = request
        return super().authenticate(request)

    def authenticate_credentials(self, token):
        User = get_user_model()

        _token = self.request.session.get('token')
        email = self.request.session.get('email')

        if token != _token:
            try:
                idinfo = client.verify_id_token(
                    token, settings.GOOGLE_CLIENT_ID)
                auth_domains = [
                    'accounts.google.com',
                    'https://accounts.google.com']
                if idinfo['iss'] not in auth_domains:
                    raise crypt.AppIdentityError("Wrong issuer.")

                email = idinfo['email']
            except crypt.AppIdentityError:
                raise AuthenticationFailed('Invalid token.')

        try:
            user = User.objects.get(username=email)
            self.request.session['token'] = token
            self.request.session['email'] = email
            return (user, token)
        except User.DoesNotExist:
            raise AuthenticationFailed('User does not exist.')


class CustomSessionAuthentication(SessionAuthentication):

    def authenticate_header(self, request):
        return 'OAuth realm="api"'
