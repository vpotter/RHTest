from django.db import models
from localflavor.generic.models import IBANField


class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    iban = IBANField()
