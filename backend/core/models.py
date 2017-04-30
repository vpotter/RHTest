from django.db import models
from django.contrib.auth.models import AbstractUser


class AdminUser(AbstractUser):
    username = models.CharField(
        'email',
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
        validators=[AbstractUser.username_validator],
        error_messages={
            'unique': "A user with that username already exists.",
        },
    )
    password = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        verbose_name = 'Admin User'
        verbose_name_plural = 'Admin Users'
