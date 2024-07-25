# Proyecto/inventario/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('productos/', views.listar_productos, name='listar_productos'),
    #path('productos/filtrar/', views.filtrar_productos, name='filtrar_productos'),
    
    path('productos/exportar_excel/', views.exportar_productos_excel, name='exportar_productos_excel'),
    path('productos/nuevo/', views.crear_producto, name='crear_producto'),
    #path('productos/detalle/<int:pk>', views.detalle_producto, name='detalle_producto'),
    path('productos/editar/<int:pk>/', views.editar_producto, name='editar_producto'),
    path('productos/eliminar/<int:pk>/', views.eliminar_producto, name='eliminar_producto'),

    path('categorias/', views.listar_categorias, name='listar_categorias'),
    path('categorias/nueva/', views.crear_categoria, name='crear_categoria'),
    path('categorias/editar/<int:pk>/', views.editar_categoria, name='modificar_categoria'),
    path('categorias/eliminar/<int:pk>/', views.eliminar_categoria, name='eliminar_categoria'),

    #path('listar_pedidos/', views.listar_pedidos, name='listar_pedidos'),
    #path('crear_pedidos/', views.crear_pedidos, name='crear_pedidos'),
    path('listar_proveedores/', views.listar_proveedores, name='listar_proveedores'),
    path('proveedor/editar/<int:pk>/', views.editar_proveedor, name='editar_proveeedor'),
    path('proveedor/eliminar/<int:pk>/', views.eliminar_proveedor, name='eliminar_proveeedor'),
    path('crear_proveedores/', views.crear_proveedores, name='crear_proveedores'),
    path('proveedores/exportar_excel/', views.exportar_proveedores_excel, name='exportar_proveedores_excel'),
]
