from rest_framework import serializers
from django.contrib.auth.models import User
from djapi.models import Componente, Proyecto

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name' , 'last_name' , 'email', 'password']

class ComponenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Componente
        fields = '__all__'

class ProyectoSerializer(serializers.ModelSerializer):
    componentes = ComponenteSerializer(many=True, read_only=True)
    class Meta:
        model = Proyecto
        fields = '__all__'