from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ComponenteSerializer, ProyectoSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from djapi.models import Accesorios, Buzzers ,ElectroAnalogica, ElectroDigital, Modulos, Motores, OptoElectronica, Sensores, Switches, Proyecto, Componente
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
import json
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import default_storage

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
        usuario_id = request.user.id
        usuario_nombre = request.user.username  # Obtener el nombre del usuario
        nombre = request.data.get('nombre')
        descripcion = request.data.get('descripcion')
        tipo = request.data.get('tipo')
        imagen1 = request.FILES.get('imagen1') if 'imagen1' in request.FILES else None
        imagen2 = request.FILES.get('imagen2') if 'imagen2' in request.FILES else None

        if tipo == 'Componente1':
            # pylint: disable=no-member
            tipo = 'Accesorio'
            accesorios = Accesorios.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            accesorios.save()
            serializer = ComponenteSerializer(accesorios)
        elif tipo == 'Componente2':
            # pylint: disable=no-member
            tipo = 'Buzzer'
            buzzers = Buzzers.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            buzzers.save()
            serializer = ComponenteSerializer(buzzers)

        elif tipo == 'Componente3':
            # pylint: disable=no-member
            tipo = 'Electro Analogica'
            electro_analogica = ElectroAnalogica.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            electro_analogica.save()
            serializer = ComponenteSerializer(electro_analogica)

        elif tipo == 'Componente4':
            # pylint: disable=no-member
            tipo = 'Electro Digital'
            electro_digital = ElectroDigital.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            electro_digital.save()
            serializer = ComponenteSerializer(electro_digital)
        elif tipo == 'Componente5':
            # pylint: disable=no-member
            tipo = 'Modulo'
            modulos = Modulos.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            modulos.save()
            serializer = ComponenteSerializer(modulos)
        elif tipo == 'Componente6':
            # pylint: disable=no-member
            tipo = 'Motor'
            motores = Motores.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            motores.save()
            serializer = ComponenteSerializer(motores)
        elif tipo == 'Componente7':
            # pylint: disable=no-member
            tipo = 'Opto Electronica'
            opto_electronica = OptoElectronica.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            opto_electronica.save()
            serializer = ComponenteSerializer(opto_electronica)
        elif tipo == 'Componente8':
            # pylint: disable=no-member
            tipo = 'Sensor'
            sensores = Sensores.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            sensores.save()
            serializer = ComponenteSerializer(sensores)
        elif tipo == 'Componente9':
            # pylint: disable=no-member
            tipo = 'Switch'
            switches = Switches.objects.create(
                usuario_id=usuario_id,
                usuario_nombre=usuario_nombre,  # Guardar el nombre del usuario
                nombre=nombre,
                descripcion=descripcion,
                tipo=tipo ,
                imagen1=imagen1,
                imagen2=imagen2
            )

            switches.save()
            serializer = ComponenteSerializer(switches)        
        else:
            return Response({'error': 'Error al seleccionar el tipo del componente'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({}, status=status.HTTP_200_OK)

#------------ MODIFICAR COMPONENTES ------------
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def modificarcomp(request, id, tipo, nombre):
    print(f"Modificando componente con ID: {id}, Tipo: {tipo}, Nombre: {nombre}")
    print("Datos recibidos: ", request.data)
    
    # Buscar la instancia del componente según el tipo
    componente_model = None
    if tipo == 'Accesorio':
        componente_model = Accesorios
    elif tipo == 'Buzzer':
        componente_model = Buzzers
    elif tipo == 'Electro Analogica':
        componente_model = ElectroAnalogica
    elif tipo == 'Electro Digital':
        componente_model = ElectroDigital
    elif tipo == 'Modulo':
        componente_model = Modulos
    elif tipo == 'Motor':
        componente_model = Motores
    elif tipo == 'Opto Electronica':
        componente_model = OptoElectronica
    elif tipo == 'Sensor':
        componente_model = Sensores
    elif tipo == 'Switch':
        componente_model = Switches
    else:
        return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)

    # Obtener la instancia específica del componente
    componente_especifico = get_object_or_404(componente_model, id=id, usuario_id=request.user.id)

    # Verificar si se han subido nuevas imágenes y si son diferentes de las existentes
    if 'fileimg1' in request.data and request.data['fileimg1']:
        if str(request.data['fileimg1']) != str(componente_especifico.imagen1):
            if componente_especifico.imagen1:
                default_storage.delete(componente_especifico.imagen1.name)
            componente_especifico.imagen1 = request.data['fileimg1']

    if 'fileimg2' in request.data and request.data['fileimg2']:
        if str(request.data['fileimg2']) != str(componente_especifico.imagen2):
            if componente_especifico.imagen2:
                default_storage.delete(componente_especifico.imagen2.name)
            componente_especifico.imagen2 = request.data['fileimg2']

    # Serializar y guardar los datos
    serializer = ComponenteSerializer(componente_especifico, data=request.data, partial=True)
    if serializer.is_valid():
        # Guardar los cambios en la instancia del componente
        serializer.save()
        
        # Obtener la instancia actualizada del componente
        componente_actualizado = serializer.instance
        
        # Guardar los cambios en la tabla "componentes"
        # pylint: disable=no-member
        componente_generico, created = Componente.objects.update_or_create(
            id_original=componente_actualizado.id,
            defaults={
                'usuario_id': componente_actualizado.usuario_id,
                'usuario_nombre': componente_actualizado.usuario_nombre,
                'nombre': componente_actualizado.nombre,
                'descripcion': componente_actualizado.descripcion,
                'tipo': componente_actualizado.tipo,
                'imagen1': componente_actualizado.imagen1,
                'imagen2': componente_actualizado.imagen2,
            }
        )
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------ ELIMINAR COMPONENTES ------------
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deletecomponent(request, id, tipo):
    print("Eliminando componente con ID:", id)
    print("Tipo del componente:", tipo)
    # Seleccionar la tabla adecuada basada en el tipo del componente
    if tipo == 'Accesorio':
        modelo = Accesorios
    elif tipo == 'Buzzer':
        modelo = Buzzers
    elif tipo == 'Electro Analogica':
        modelo = ElectroAnalogica
    elif tipo == 'Electro Digital':
        modelo = ElectroDigital
    elif tipo == 'Modulo':
        modelo = Modulos
    elif tipo == 'Motor':
        modelo = Motores
    elif tipo == 'Opto Electronica':
        modelo = OptoElectronica
    elif tipo == 'Sensor':
        modelo = Sensores
    elif tipo == 'Switch':
        modelo = Switches
    else:
        return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Obtener el componente específico de la tabla
        componente = get_object_or_404(modelo, id=id, usuario_id=request.user.id)
        componente.delete()
        return JsonResponse({'message': 'Componente eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ------------ OBTENER COMPONENTES ------------
@api_view(['GET'])
def componentes(request):
    print("Mostrando componentes")
    try:
        # pylint: disable=no-member
        accesorios = Accesorios.objects.all()
        buzzers = Buzzers.objects.all()
        electro_analogica = ElectroAnalogica.objects.all()
        electro_digital = ElectroDigital.objects.all()
        modulos = Modulos.objects.all()
        motores = Motores.objects.all()
        opto_electronica = OptoElectronica.objects.all()
        sensores = Sensores.objects.all()
        switches = Switches.objects.all()

        accesorios_serializer = ComponenteSerializer(accesorios, many=True)
        buzzers_serializer = ComponenteSerializer(buzzers, many=True)
        electro_analogica_serializer = ComponenteSerializer(electro_analogica, many=True)
        electro_digital_serializer = ComponenteSerializer(electro_digital, many=True)
        modulos_serializer = ComponenteSerializer(modulos, many=True)
        motores_serializer = ComponenteSerializer(motores, many=True)
        opto_electronica_serializer = ComponenteSerializer(opto_electronica, many=True)
        sensores_serializer = ComponenteSerializer(sensores, many=True)
        switches_serializer = ComponenteSerializer(switches, many=True)

        componentes = {
            'accesorios': accesorios_serializer.data,
            'buzzers': buzzers_serializer.data,
            'electro_analogica': electro_analogica_serializer.data,
            'electro_digital': electro_digital_serializer.data,
            'modulos': modulos_serializer.data,
            'motores': motores_serializer.data,
            'opto_electronica': opto_electronica_serializer.data,
            'sensores': sensores_serializer.data,
            'switches': switches_serializer.data,
        } 

        return Response(componentes, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'ERROR', str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def obtener_informacion_componente(request, id, tipo, nombre):
    print(f"Componente Seleccionado: ID = {id}, Tipo = {tipo}, Nombre = {nombre}")
    try:
        #pylint: disable=no-member
        if tipo == 'Accesorio':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = Accesorios.objects.get(id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Buzzer':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(Buzzers, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Electro Analogica':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(ElectroAnalogica, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Electro Digital':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(ElectroDigital, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Modulo':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(Modulos, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Motor':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(Motores, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Opto Electronica':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(OptoElectronica, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Sensor':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(Sensores, id=id, tipo=tipo, nombre=nombre)
        elif tipo == 'Switch':
            print("ID de Accesorio: ", id)
            print("Tipo de Accesorio: ", tipo)
            print("Nombre de Accesorio: ", nombre)
            componente = get_object_or_404(Switches, id=id, tipo=tipo, nombre=nombre)
        else:
            return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ComponenteSerializer(componente)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

# ------------ CREAR PROYECTO ------------
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def proyect(request):
    print("Creando proyecto")
    if request.method == 'POST':
        usuario_id = request.user.id
        nombre = request.data.get('nombre')
        descripcion = request.data.get('descripcion')
        imagen = request.FILES.get('imagen1') if 'imagen1' in request.FILES else None
        componentes_data = request.data.getlist('componente[]')

        if not nombre or not descripcion:
            return Response({'error': 'Nombre y descripción son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        print("Nombre: ", nombre)
        print("Descripción: ", descripcion)
        print("Imagen: ", imagen)
        print("Componentes: ", componentes_data)

        try:
            #pylint: disable=no-member
            proyecto = Proyecto.objects.create(
                usuario_id=usuario_id,
                nombre=nombre,
                descripcion=descripcion,
                imagen=imagen
            )

            componentes_correctos = []

            for comp_data in componentes_data:
                try:
                    comp_data_dict = json.loads(comp_data)
                    print(f"Procesando componente: {comp_data_dict}")
                    tipo = comp_data_dict.get('tipo')
                    id_componente = comp_data_dict.get('id')
                    nombre_componente = comp_data_dict.get('nombre')

                    print("Tipo del componente recibido: ", tipo)
                    print("ID del componente recibido: ", id_componente)

                    componente_especifico = None
                    # pylint: disable=no-member
                    if tipo == 'Accesorio':
                        print("ID de Accesorio: ", id_componente)
                        componente_especifico = get_object_or_404(Accesorios, id=id_componente)
                    elif tipo == 'Buzzer':
                        print("ID de Buzzer: ", id_componente)
                        componente_especifico = get_object_or_404(Buzzers, id=id_componente)
                    elif tipo == 'Electro Analogica':
                        print("ID de Electro Analogica: ", id_componente)
                        componente_especifico = get_object_or_404(ElectroAnalogica, id=id_componente)
                    elif tipo == 'Electro Digital':
                        print("ID de Electro Digital: ", id_componente)
                        componente_especifico = get_object_or_404(ElectroDigital, id=id_componente)
                    elif tipo == 'Modulo':
                        print("ID de Modulo: ", id_componente)
                        componente_especifico = get_object_or_404(Modulos, id=id_componente)
                    elif tipo == 'Motor':
                        print("ID de Motor: ", id_componente)
                        componente_especifico = get_object_or_404(Motores, id=id_componente)
                    elif tipo == 'Opto Electronica':
                        print("ID de Opto Electronica: ", id_componente)
                        componente_especifico = get_object_or_404(OptoElectronica, id=id_componente)
                    elif tipo == 'Sensor':
                        print("ID de Sensor: ", id_componente)
                        componente_especifico = get_object_or_404(Sensores, id=id_componente)
                    elif tipo == 'Switch':
                        print("ID de Switch: ", id_componente)
                        componente_especifico = get_object_or_404(Switches, id=id_componente)
                    else:
                        return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)
                    
                    componente_generico, created = Componente.objects.get_or_create(
                        usuario_id=componente_especifico.usuario_id,
                        usuario_nombre=componente_especifico.usuario_nombre,
                        nombre=nombre_componente,
                        descripcion=componente_especifico.descripcion,
                        tipo=tipo,
                        imagen1=componente_especifico.imagen1,
                        imagen2=componente_especifico.imagen2,
                        id_original=id_componente,
                    )
                    if created:
                        print(f"Nuevo componente creado y agregado al proyecto: {componente_generico}")
                    else:
                        print(f"Componente existente agregado al proyecto: {componente_generico}")

                    proyecto.componentes.add(componente_generico)
                    componentes_correctos.append(True)
                except Exception as comp_err:
                    print(f"Error procesando componente: {comp_err}")
                    componentes_correctos.append(False)

            # Verificar si todos los componentes se almacenaron correctamente
            if all(componentes_correctos):
                print("Todos los componentes se almacenaron correctamente, el proyecto se almaceno.")
                proyecto.save()
                serializer = ProyectoSerializer(proyecto)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # Eliminar el proyecto si no se pudieron almacenar todos los componentes
                proyecto.delete()
                return Response({'error': 'No se pudieron almacenar todos los componentes correctamente'},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# ------------ OBTENER PROYECTOS ------------
@api_view(['GET'])
def obtenerproy(request):
    print("Mostrando proyectos")
    if request.method == 'GET':
        try:
            # pylint: disable=no-member
            proyectos = Proyecto.objects.all()
            Proyectoserializer = ProyectoSerializer(proyectos, many=True)
            proyectos = Proyectoserializer.data 

            return Response(proyectos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def lastproy(request):
    print("Mostrando proyectos los ultimos 5 proyectos")
    if request.method == 'GET':
        try:

            # pylint: disable=no-member
            proyectos = Proyecto.objects.order_by('-fecha_creacion')[:5]
            
            # Serializar los proyectos
            Proyectoserializer = ProyectoSerializer(proyectos, many=True)
            proyectos = Proyectoserializer.data 

            return Response(proyectos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# ------------ OBTENER INFORMACIÓN DE PROYECTO ------------
@api_view(['GET'])
def infop(request, id):
    print(f"Obteniendo información del proyecto con ID: {id}")
    try:
        proyecto = get_object_or_404(Proyecto, id=id)
        proyecto_serializer = ProyectoSerializer(proyecto)
        print(f"Proyecto: {proyecto_serializer.data}")
        componentes = proyecto.componentes.all()
        componentes_serializer = ComponenteSerializer(componentes, many=True)
        print(f"Componentes: {componentes_serializer.data}")
        data = {
            'proyecto': proyecto_serializer.data,
            'componentes': componentes_serializer.data
        }

        return Response(data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

# ------------ MODIFICAR PROYECTO ------------
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def alterproy(request, id):
    print(f"Modificando proyecto con ID: {id}")
    print("Datos recibidos: ", request.data)

    try:
        proyecto = get_object_or_404(Proyecto, id=id, usuario_id=request.user.id)
        print("Proyecto encontrado: ", proyecto)

        if 'fileimg1' in request.data and request.data['fileimg1']:
            if str(request.data['fileimg1']) != str(proyecto.imagen):
                if proyecto.imagen:
                    default_storage.delete(proyecto.imagen.name)
            proyecto.imagen = request.data['fileimg1']


        # Almacenar componentes actuales en una lista
        componentes_actuales_ids = list(proyecto.componentes.values_list('id_original','tipo'))
        componentes_data = request.data.getlist('componentes[]')
        nuevos_componentes = []
        componentes_nuevos_ids = []
        print("Componentes actuales: ", componentes_actuales_ids)

        for comp_data in componentes_data:
            try:
                comp = json.loads(comp_data)
                print(f"Procesando componente: {comp}")
                tipo = comp.get('tipo')
                id_componente = comp.get('id')
                nombre_componente = comp.get('nombre')

                componentes_nuevos_ids.append((id_componente, tipo))

                if (id_componente, tipo) in componentes_actuales_ids:

                    for comp in proyecto.componentes.all():
                        if (comp.id_original, comp.tipo) not in componentes_nuevos_ids:
                            print(f"Eliminando componente del proyecto: {comp.id_original} - {comp.tipo} - {comp.nombre}")
                            proyecto.componentes.remove(comp)
                            break

                    print(f"El componente con ID {id_componente} y tipo {tipo} ya existe en el proyecto, se omite.")
                    continue

                componente_especifico = None
                # pylint: disable=no-member
                if tipo == 'Accesorio':
                    componente_especifico = get_object_or_404(Accesorios, id=id_componente)
                elif tipo == 'Buzzer':
                    componente_especifico = get_object_or_404(Buzzers, id=id_componente)
                elif tipo == 'Electro Analogica':
                    componente_especifico = get_object_or_404(ElectroAnalogica, id=id_componente)
                elif tipo == 'Electro Digital':
                    componente_especifico = get_object_or_404(ElectroDigital, id=id_componente)
                elif tipo == 'Modulo':
                    componente_especifico = get_object_or_404(Modulos, id=id_componente)
                elif tipo == 'Motor':
                    componente_especifico = get_object_or_404(Motores, id=id_componente)
                elif tipo == 'Opto Electronica':
                    componente_especifico = get_object_or_404(OptoElectronica, id=id_componente)
                elif tipo == 'Sensor':
                    componente_especifico = get_object_or_404(Sensores, id=id_componente)
                elif tipo == 'Switch':
                    componente_especifico = get_object_or_404(Switches, id=id_componente)
                else:
                    return Response({'error': 'Tipo de componente no válido'}, status=status.HTTP_400_BAD_REQUEST)

                componente_generico, created = Componente.objects.get_or_create(
                    usuario_id=componente_especifico.usuario_id,
                    usuario_nombre=componente_especifico.usuario_nombre,
                    nombre=nombre_componente,
                    descripcion=componente_especifico.descripcion,
                    tipo=tipo,
                    imagen1=componente_especifico.imagen1,
                    imagen2=componente_especifico.imagen2,
                    id_original=id_componente,
                )

                if created:
                    print(f"Nuevo componente creado y agregado al proyecto: {componente_generico}")
                else:
                    print(f"Componente existente agregado al proyecto: {componente_generico}")

                nuevos_componentes.append(componente_generico)

            except (ObjectDoesNotExist, KeyError, json.JSONDecodeError) as e:
                print(f"Error al procesar componente: {e}")
                continue

        # Agregar los nuevos componentes seleccionados al proyecto
        for comp in nuevos_componentes:
            proyecto.componentes.add(comp)

        # Guardar los cambios en el proyecto
        proyecto.save()

        serializer = ProyectoSerializer(proyecto, data=request.data, partial=True)
        if serializer.is_valid():
            print("Datos válidos: ", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ------------ ELIMINAR PROYECTO ------------
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delproy(request, id):
    print(f"Eliminando proyecto con ID: {id}")
    try:
        proyecto = get_object_or_404(Proyecto, id=id, usuario_id=request.user.id)
        proyecto.delete()
        return JsonResponse({'message': 'Proyecto eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


#-------------- OBTENER MIS PROYECTOS Y COMPONENTES ------------
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def myposts(request):
    print("Mostrando mis proyectos y componentes de usuario: ID = ", request.user.id)
    try:
        # Obtener el usuario actual
        user = request.user
        # Obtener los componentes del usuario actual
        # pylint: disable=no-member

        # Obtener todos los componentes del usuario actual de todas las tablas
        user_components = []

        # Recorrer todas las tablas de componentes y agregar los componentes del usuario a la lista
        for model in [Accesorios, Buzzers, ElectroAnalogica, ElectroDigital, Modulos, Motores, OptoElectronica, Sensores, Switches]:
            components = model.objects.filter(usuario_id=user.id)
            user_components.extend(components)

        component_serializer = ComponenteSerializer(user_components, many=True)

        # Obtener los proyectos del usuario actual
        user_projects = Proyecto.objects.filter(usuario_id=user.id)
        project_serializer = ProyectoSerializer(user_projects, many=True)

        return Response({
            'user_components': component_serializer.data,
            'user_projects': project_serializer.data
            
        }, status=status.HTTP_200_OK)
    
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)