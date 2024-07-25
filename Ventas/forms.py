from django import forms
from .models import Venta, DetalleVenta

class VentaForm(forms.ModelForm):
    class Meta:
        model = Venta
        fields = ['descripcion', 'vendedor', 'fecha_creacion']
