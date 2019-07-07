from rest_framework import serializers
from . import models

class orderserializer(serializers.ModelSerializer):
    class Meta:
        model = models.order
        fields = "__all__"
