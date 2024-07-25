from django.urls import path
from . import views


urlpatterns = [
    path('listar_pedidos/', views.listar_pedidos, name='listar_pedidos'),
    path('crear_pedidos/', views.crear_pedidos, name='crear_pedidos'),
    path('listar_pedidos_entregados/', views.listar_pedidos_entregados, name='listar_pedidos_entregados'),
]
