from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from users.views import UserViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'users/', UserViewSet, base_name='users')

urlpatterns = [
    url(r'^api/', include(router.urls, namespace='api')),
]
