# Proyecto/views.py
# Para pruebas con los templates, pse puede eliminar
from django.shortcuts import render

def home(request):
    return render(request, 'base.html', {'grupos_usuario': request.user.categoria})

def dashboard(request):
    return render(request, 'dashboard.html')