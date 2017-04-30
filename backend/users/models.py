from django.db import models
from localflavor.generic.models import IBANField

from core.models import AdminUser


class User(models.Model):
    creator = models.ForeignKey(AdminUser)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    iban = IBANField()

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)
