from rest_framework import serializers
from .models import Applicant
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError


class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'

    def validate(self, data):
        instance = Applicant(**data)
        try:
            instance.clean()
        except DjangoValidationError as e:
            raise ValidationError(e.message_dict if hasattr(
                e, 'message_dict') else {'non_field_errors': e.messages})
        return data
