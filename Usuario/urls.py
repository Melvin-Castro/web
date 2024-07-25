from django.urls import path
from .views import list_usuarios, agregar_usuario, inicio_sesion, cerrar_sesion, eliminar_usuario, editar_permisos

urlpatterns = [
    path('', inicio_sesion, name='login'),
    path('usuarios/', list_usuarios, name='lista_usuarios'),
    path('agregar/', agregar_usuario, name='agregar_usuario'),
    path('eliminar/<int:usuario_id>/', eliminar_usuario, name='eliminar_usuario'),
    path('editar_permisos/<int:usuario_id>/', editar_permisos, name='editar_permisos'),
    path('logout/', cerrar_sesion, name='logout'),
    #path('max', loginView, name='loginM'),  # Login es la primera ruta
    # path('logout/', logout, name='logoutM'),
]

