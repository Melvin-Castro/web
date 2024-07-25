from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.db import transaction, IntegrityError, DatabaseError
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Producto, Venta, DetalleVenta
from Core.models import Usuario, Producto
from decimal import Decimal


@login_required
def ventas_list(request):
    productos = Producto.objects.all().order_by('id')
    if not request.user.id_permisos.ventas_CD:
        messages.error(request, 'No tienes permiso para acceder a esta página.')
        return redirect('home')  # Asume que tienes una vista 'home'
    
    venta = Venta.objects.all().order_by('-fecha_creacion')
    producto =  Producto.objects.all().order_by('id')

    return render(request, 'ventas/ventas_list.html', {'venta': venta, 'producto': producto})


@login_required
def detalle_venta(request, venta_id):
    if not request.user.id_permisos.ventas_CD:
        messages.error(request, 'No tienes permiso para acceder a esta página.')
        return redirect('home')
    
    venta = get_object_or_404(Venta, id=venta_id)
    detalles = DetalleVenta.objects.filter(venta=venta)
    return render(request, 'ventas/detalle_venta.html', {
        'venta': venta,
        'detalles': detalles
    })

@login_required
def agregar_venta(request):
    print(request.POST)

    if not request.user.id_permisos.ventas_CD:
        return JsonResponse({'success': False, 'error': 'No tienes permiso para realizar esta acción.'}, status=403)
    
    if request.method == 'POST':
        user = request.user

        
        vendedor = get_object_or_404(Usuario, id=user.id)

        #venta = Venta(vendedor=vendedor)
        #venta.save()

        productos_ids = request.POST.getlist('MyProds')

        '''
        for item in productos_ids:
            id_p, unidad = item.split('-')
            producto = get_object_or_404(Producto, id=id_p)
            precio_unitario = producto.precio_venta
            detalle = DetalleVenta(
                venta=venta,
                producto=producto
            )
            detalle.save()
        '''
        return redirect('ventas_list')
    
    productos = Producto.objects.all().order_by('id')
    return render(request, 'ventas/ventas_list.html', {'productos': productos})


@login_required
def agregar_producto_venta(request):
    if not request.user.id_permisos.ventas_CD:
        return JsonResponse({'error': 'No tienes permiso para realizar esta acción.'}, status=403)
    
    if request.method == 'POST':
        venta_id = request.POST.get('venta_id')
        producto_id = request.POST.get('producto_id')
        unidades = int(request.POST.get('unidades'))
        
        venta = get_object_or_404(Venta, id=venta_id)
        producto = get_object_or_404(Producto, id=producto_id)
        
        if producto.stock < unidades:
            return JsonResponse({'error': 'No hay suficiente stock disponible.'}, status=400)
        
        detalle = DetalleVenta.objects.create(
            venta=venta,
            producto=producto,
            unidades=unidades,
            precio_unitario=producto.precio_venta
        )
        
        producto.stock -= unidades
        producto.save()
        
        venta.total += detalle.importe
        venta.save()
        
        return JsonResponse({
            'id': detalle.id,
            'producto': producto.nombre,
            'precio_unitario': float(detalle.precio_unitario),
            'unidades': detalle.unidades,
            'importe': float(detalle.importe)
        })
    return redirect('ventas/ventas_list.html')

@login_required
def eliminar_venta(request, venta_id):
    if not request.user.id_permisos.ventas_CD:
        messages.error(request, 'No tienes permiso para realizar esta acción.')
        return redirect('ventas_list')
    
    venta = get_object_or_404(Venta, id=venta_id)
    for detalle in venta.detalles.all():
        producto = detalle.producto
        producto.stock += detalle.unidades
        producto.save()
    
    venta.delete()
    messages.success(request, 'Venta eliminada con éxito.')
    return redirect('ventas_list')


@login_required
def crear_excel(request):
    if not request.user.id_permisos.ventas_CD:
        return JsonResponse({'error': 'No tienes permiso para realizar esta acción.'}, status=403)
    
    # Implementa la lógica para crear el Excel aquí
    
    messages.success(request, 'Excel creado exitosamente.')
    return JsonResponse({'success': True, 'message': 'Excel creado exitosamente'})
