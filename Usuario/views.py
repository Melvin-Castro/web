from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from Core.models import Usuario
from django.contrib.auth import get_user_model
from django.contrib.auth import logout
from django.urls import reverse
from Core.decorators import permisos_para
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password 

User = get_user_model()

#@permisos_para(lambda u: u.is_superuser)
@permisos_para(lambda u: u.categoria == 'Administrador' or u.is_superuser)
def list_usuarios(request):
    usuarios = User.objects.all().order_by('id')
    return render(request, 'lista_usuarios.html', {
        'usuarios': usuarios,
        'nombre_usuario': request.user.username, 
        'grupos_usuario': request.user.categoria
    })

@permisos_para(lambda u: u.categoria == 'Administrador' or u.is_superuser)
def agregar_usuario(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        nombre = request.POST['nombre']
        apellido = request.POST['apellido']
        categoria = request.POST['categoria']

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            nombre=nombre,
            apellido=apellido,
            categoria=categoria
        )
        #login(request, user)

        messages.success(request, "Usuario agregado correctamente.")
        return redirect('lista_usuarios')
    
@permisos_para(lambda u: u.categoria == 'Administrador' or u.is_superuser)
def eliminar_usuario(request, usuario_id): # TODO si uno es administrador puede eliminarse a si mismo ,y seo no edberia
    usuario = get_object_or_404(Usuario, id=usuario_id)
    if request.user == usuario:
        messages.error(request, "No puedes eliminar tu propio usuario.")
        return redirect('lista_usuarios')
    usuario.delete()
    messages.success(request, "Usuario eliminado correctamente.")
    return redirect('lista_usuarios')

def inicio_sesion(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('lista_usuarios')  # Redirige a la lista de usuarios después de iniciar sesión
        else:
            return render(request, 'login.html', {'error': 'Credenciales inválidas', 'nombre_usuario': request.user.username})
    else:   
        return render(request, 'login.html')

@login_required
def cerrar_sesion(request):
    logout(request)
    return redirect(reverse('login'))

@permisos_para(lambda u: u.categoria == 'Administrador' or u.is_superuser)
def editar_permisos(request, usuario_id):
    usuario = get_object_or_404(Usuario, id=usuario_id)
    permisos = usuario.id_permisos

    if request.method == 'POST':
        # Actualizar campos del usuario
        usuario.username = request.POST.get('username', usuario.username)
        usuario.email = request.POST.get('email', usuario.email)

        # Actualizar la contraseña solo si se proporciona una nueva
        nueva_password = request.POST.get('password')
        if nueva_password:
            usuario.password = make_password(nueva_password)
        
        usuario.nombre = request.POST.get('nombre', usuario.nombre)
        usuario.apellido = request.POST.get('apellido', usuario.apellido)
        usuario.categoria = request.POST.get('categoria', usuario.categoria)
        usuario.save()

        # Actualizar permisos
        permisos.pedidos_pen_CUD = 'pedidos_pen_CUD' in request.POST
        permisos.pedidos_pen_S = 'pedidos_pen_S' in request.POST
        permisos.pedidos_rec_G = 'pedidos_rec_G' in request.POST
        permisos.inventario_cat_CUD = 'inventario_cat_CUD' in request.POST
        permisos.inventario_pro_CUD = 'inventario_pro_CUD' in request.POST
        permisos.inventario_pro_G = 'inventario_pro_G' in request.POST
        permisos.ventas_CD = 'ventas_CD' in request.POST
        permisos.panel_admin = 'panel_admin' in request.POST
        permisos.save()
        messages.success(request, "Cambios realizados correctamente.")
        return redirect('lista_usuarios')
    
    if request.method == 'GET':
        permisos_data = {
            'pedidos_pen_CUD': permisos.pedidos_pen_CUD,
            'pedidos_pen_S': permisos.pedidos_pen_S,
            'pedidos_rec_G': permisos.pedidos_rec_G,
            'inventario_cat_CUD': permisos.inventario_cat_CUD,
            'inventario_pro_CUD': permisos.inventario_pro_CUD,
            'inventario_pro_G': permisos.inventario_pro_G,
            'ventas_CD': permisos.ventas_CD,
            'panel_admin': permisos.panel_admin
        }
        return JsonResponse(permisos_data)
    
# # Max's Creations
    
# def is_admin(user):
#     return user.groups.filter(name='Administrador').exists()

# # Login view
# # def loginView(request):
# #     crear_grupos()  # Crear grupos si no existen
# #     if request.method == 'POST':
# #         username = request.POST['username']
# #         password = request.POST['password']

# #         user = auth.authenticate(username=username, password=password)

# #         if user is not None:
# #             auth.login(request, user)
# #             return redirect('home')  # Redirigir al sistema

# #         else:
# #             messages.error(request, 'Credenciales inválidas')
# #             return redirect('/')
# #     else:
# #         return render(request, 'login.html')
    
    
# # Vista de Home
# @login_required
# def homeView(request):
#     usuario = request.user
#     grupos_usuario = usuario.groups.values_list('name', flat=True)
#     context = {
#         'nombre_usuario': usuario.username,
#         'grupos_usuario': list(grupos_usuario)
#     }
#     return render(request, 'home.html', context)