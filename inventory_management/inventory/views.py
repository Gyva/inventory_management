from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Equipment, Request
from .serializers import UserSerializer, EquipmentSerializer, RequestSerializer

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class EquipmentViewSet(viewsets.ModelViewSet):

    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class RequestViewSet(viewsets.ModelViewSet):

    queryset = Request.objects.all()
    serializer_class= RequestSerializer
    
