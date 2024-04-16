from django.db import models

# Create your models here.
class UserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()
    
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=10)
    objects = UserManager()

