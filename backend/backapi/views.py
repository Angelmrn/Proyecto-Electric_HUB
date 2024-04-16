from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from djapi.models import User  # Importa tu modelo personalizado
from rest_framework import status
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def login(request):

    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.get(username=username)

    if not user.check_password(password):
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user) #pylint: disable=no-member
    serializer = UserSerializer(user)

    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def create(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()  
        user.set_password(serializer.data['password'])
        user.save()

        token = Token.objects.create(user=user) #pylint: disable=no-member

        return Response({'token': token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def profile(request):
    return Response({})
