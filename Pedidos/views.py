from django.shortcuts import render
from .forms import PedidoForm, ActualizarEstadoPedidoForm, ProveedoresForm
from Core.models import Pedido, Producto
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Create your views here.

@login_required
def listar_pedidos(request):
    pedidos_en_proceso = Pedido.objects.filter(estado='en_proceso')
    pedidos_entregados = Pedido.objects.filter(estado='entregado')

    if request.method == 'POST':
        form = ActualizarEstadoPedidoForm(request.POST)
        if form.is_valid():
            pedido_id = request.POST.get('pedido_id')
            pedido = get_object_or_404(Pedido, id=pedido_id)
            pedido.estado = form.cleaned_data['estado']
            pedido.save()
            return redirect('listar_pedidos')  # Redirigir después de actualizar estado
    else:
        form = ActualizarEstadoPedidoForm()
    
    return render(request, 'listar_pedidos.html', {
        'pedidos_en_proceso': pedidos_en_proceso,
        'pedidos_entregados': pedidos_entregados,
        'form': form
    })
    
@login_required
def listar_pedidos_entregados(request):
    pedidos_entregados = Pedido.objects.filter(estado='entregado')
    
    return render(request, 'listar_pedidos_entregados.html', {
        'pedidos_entregados': pedidos_entregados,
    })

    
#@login_required
def crear_pedidos(request):
    if request.method == 'POST':
        form = PedidoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Pedido creado exitosamente.')
            return redirect('listar_pedidos')
        else:
            messages.error(request, 'Por favor corrige los errores del formulario.')
    else:
        form = PedidoForm()
    
    return render(request, 'crear_pedidos.html', {'form': form})

