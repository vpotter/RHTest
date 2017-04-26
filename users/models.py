from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from localflavor.generic.models import IBANField


class AdminUser(AbstractBaseUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'


class User(models.Model):
    creator = models.ForeignKey(AdminUser)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    iban = IBANField()
