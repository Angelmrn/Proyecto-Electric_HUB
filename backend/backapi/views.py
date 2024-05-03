from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_list_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError

@api_view(['POST'])
def login(request):

    try:
        user = User.objects.get(email=request.data.get('email'))
    except User.DoesNotExist: # pylint: disable=no-member
        return Response({'error': 'No existe el Usuario'}, status=status.HTTP_404_NOT_FOUND)

    if not user.check_password(request.data['password']):
        return Response({'error': 'Contraseña Incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

    
    # pylint: disable=no-member
    token, created = Token.objects.get_or_create(user=user)
    
    serializer = UserSerializer(instance=user)

    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']

        # Verificar si el correo electrónico ya existe
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo electrónico ya está en uso'}, status=status.HTTP_400_BAD_REQUEST)

        # Si el nombre de usuario y el correo electrónico no existen, guardar el usuario
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

        # Crear el token de autenticación
        # pylint: disable=no-member
        token, created = Token.objects.get_or_create(user=user)


        return Response({}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    serialzier = UserSerializer(request.user)
    return Response({'user': serialzier.data}, status=status.HTTP_200_OK)