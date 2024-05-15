from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ElectroAnalogicaSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from djapi.models import Accesorios, Buzzers ,ElectroAnalogica, ElectroDigital, Modulos, Motores, OptoElectronica, Sensores, Switches
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes


# ------------ INGRESAR USUARIO ------------
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

    return Response({"token": token.key}, status=status.HTTP_200_OK)


# ------------ REGISTRAR USUARIO ------------
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


        return Response({"token": token.key}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------ OBTENER USUARIO ------------
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    serialzier = UserSerializer(request.user)
    return Response({'user': serialzier.data}, status=status.HTTP_200_OK)



# ------------ CREAR COMPONENTES ------------
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def upload(request):

    if request.method == 'POST':
        print(request.user)

        usuario_id = request.user.id
        nombre = request.data.get('nombre')
        descripcion = request.data.get('descripcion')
        tipo = request.data.get('tipo')
        imagen1 = request.FILES.get('imagen1') if 'imagen1' in request.FILES else None
        imagen2 = request.FILES.get('imagen2') if 'imagen2' in request.FILES else None

        print(nombre, descripcion, tipo, imagen1, imagen2)

        if tipo == 'Componente1':
            # pylint: disable=no-member
            tipo = 'Accesorios'
            accesorios = Accesorios.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            accesorios.save()
            serializer = ElectroAnalogicaSerializer(accesorios)
        elif tipo == 'Componente2':
            # pylint: disable=no-member
            tipo = 'Buzzers'
            buzzers = Buzzers.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            buzzers.save()
            serializer = ElectroAnalogicaSerializer(buzzers)

        elif tipo == 'Componente3':
            # pylint: disable=no-member
            tipo = 'Electro Analogica'
            electro_analogica = ElectroAnalogica.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            electro_analogica.save()
            serializer = ElectroAnalogicaSerializer(electro_analogica)

        elif tipo == 'Componente4':
            # pylint: disable=no-member
            tipo = 'Electro Digital'
            electro_digital = ElectroDigital.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            electro_digital.save()
            serializer = ElectroAnalogicaSerializer(electro_digital)
        elif tipo == 'Componente5':
            # pylint: disable=no-member
            tipo = 'Modulos'
            modulos = Modulos.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            modulos.save()
            serializer = ElectroAnalogicaSerializer(modulos)
        elif tipo == 'Componente6':
            # pylint: disable=no-member
            tipo = 'Motores'
            motores = Motores.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            motores.save()
            serializer = ElectroAnalogicaSerializer(motores)
        elif tipo == 'Componente7':
            # pylint: disable=no-member
            tipo = 'Opto Electronica'
            opto_electronica = OptoElectronica.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            opto_electronica.save()
            serializer = ElectroAnalogicaSerializer(opto_electronica)
        elif tipo == 'Componente8':
            # pylint: disable=no-member
            tipo = 'Sensores'
            sensores = Sensores.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            sensores.save()
            serializer = ElectroAnalogicaSerializer(sensores)
        elif tipo == 'Componente9':
            # pylint: disable=no-member
            tipo = 'Switch'
            switches = Switches.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            switches.save()
            serializer = ElectroAnalogicaSerializer(switches)        
        else:
            return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_200_OK)


# ------------  MODIFICAR COMPONENTES ------------
@api_view(['POST'])
def alter(request):


    return Response({}, status=status.HTTP_200_OK)



# ------------ ELIMINAR COMPONENTES ------------
@api_view(['POST'])
def delete(request):


    return Response({}, status=status.HTTP_200_OK)

