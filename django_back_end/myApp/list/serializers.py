from rest_framework import serializers
from list.models import List

# Create Serializer

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'