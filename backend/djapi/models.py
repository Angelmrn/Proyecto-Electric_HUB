from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Componente(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)
    id_original = models.IntegerField(null=True, blank=True)
    
class TipoComponente(models.Model):
    componente = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

#------------  COMPONENTE 1 ------------
class Accesorios(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/',null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)

#------------  COMPONENTE 2 ------------
class Buzzers(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)

#------------  COMPONENTE 3 ------------
class ElectroAnalogica(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)

#------------  COMPONENTE 4 ------------
class ElectroDigital(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)
    
#------------  COMPONENTE 5 ------------
class Modulos(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)

#------------  COMPONENTE 6 ------------
class Motores(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)
    
#------------  COMPONENTE 7 ------------
class OptoElectronica(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)
    
#------------  COMPONENTE 8 ------------
class Sensores(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)

#------------  COMPONENTE 9 ------------
class Switches(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=100)
    imagen1 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    imagen2 = models.ImageField(upload_to='imagenes/' ,null=True, blank=True)
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)
    
class Proyecto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    usuario_nombre = models.CharField(max_length=150, default="")
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    componentes = models.ManyToManyField(Componente, related_name='proyectos')
    fecha_creacion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.nombre)