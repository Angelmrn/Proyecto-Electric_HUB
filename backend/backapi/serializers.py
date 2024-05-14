from rest_framework import serializers
from django.contrib.auth.models import User
from djapi.models import ElectroAnalogica

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name' , 'last_name' , 'email', 'password']

class ElectroAnalogicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectroAnalogica
        fields = '__all__'