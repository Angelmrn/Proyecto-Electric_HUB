from django.db import models
from django.contrib.auth.hashers import make_password
# Create your models here.
class UserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset()
    
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=128)
    objects = UserManager()

    def save(self, *args, **kwargs):

        self.password = make_password(self.password)
        super().save(*args, **kwargs)