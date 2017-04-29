from django.db import models
from django.contrib.auth.models import AbstractUser

from localflavor.generic.models import IBANField


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


class User(models.Model):
    creator = models.ForeignKey(AdminUser)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    iban = IBANField()

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)
