from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .serializer import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def done(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()
        return Response({
            'status': 'djapi mardk as done'
            if task.done else 'djapi mark as not done'     
        }, status=status.HTTP_200_OK)