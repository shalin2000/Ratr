from list.models import List
from rest_framework import viewsets, permissions
from .serializers import ListSerializer

#List viewset
class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ListSerializer