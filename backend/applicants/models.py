from django.db import models
from django.core.exceptions import ValidationError
from datetime import date


class Applicant(models.Model):
    # data applicant
    name = models.CharField(max_length=100)
    identification = models.BigIntegerField(unique=True)
    birth_date = models.DateField()
    address = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    motivation = models.TextField(blank=False, null=False)

    name_guardian = models.CharField(max_length=100, blank=True, null=True)
    identification_guardian = models.BigIntegerField(
        unique=True, blank=True, null=True)
    address_guardian = models.CharField(max_length=100, blank=True, null=True)
    email_guardian = models.EmailField(unique=True, blank=True, null=True)
    phone_number_guardian = models.CharField(
        max_length=15, blank=True, null=True)

    @property
    def age(self):
        # Calculate age from birth date
        today = date.today()
        return today.year - self.birth_date.year - \
            ((today.month, today.day) < (self.birth_date.month, self.birth_date.day))

    def clean(self):
        # Validate guardian fields if applicant is under 18
        if self.age < 18:
            required_fields = [
                self.name_guardian,
                self.identification_guardian,
                self.address_guardian,
                self.email_guardian,
                self.phone_number_guardian
            ]
            if not all(required_fields):
                raise ValidationError("Los menores de edad tiene que tener un acudiente"
                                      )
        else:

            self.name_guardian = None
            self.identification_guardian = None
            self.address_guardian = None
            self.email_guardian = None
            self.phone_number_guardian = None

    def __str__(self):
        return self.name
