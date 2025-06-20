"""
URL configuration for backapi project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('admin/', admin.site.urls),
    path('', include('djapi.urls')),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('profile', views.profile),
    re_path('upload', views.upload),
    re_path('proyect', views.proyect),
    path('obtenerproy', views.obtenerproy),
    path('lastproy', views.lastproy),
    path('infop/<int:id>/', views.infop),
    path('componentes', views.componentes),
    path('componentes/<int:id>/<str:tipo>/<str:nombre>/', views.obtener_informacion_componente),
    path('myposts', views.myposts),
    path('modificarcomp/<int:id>/<str:tipo>/<str:nombre>/', views.modificarcomp),
    path('deletecomponent/<int:id>/<str:tipo>/', views.deletecomponent),
    path('alterproy/<int:id>/', views.alterproy),
    path('delproy/<int:id>/', views.delproy),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

