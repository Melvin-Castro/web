# Proyecto/Inventario/forms.py

from django import forms
from django.core.exceptions import ValidationError
from Core.models import Producto, Categoria, Pedido, Proveedores

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['categorias', 'nombre', 'stock', 'precio_compra', 'precio_venta', 'stock_min', 'stock_max']
        widgets = {
            'categorias': forms.CheckboxSelectMultiple(),
        }

class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ['nombre', 'descripcion']

class ProveedorSelect(forms.Select):
    def create_option(self, name, value, label, selected, index, subindex=None, attrs=None):
        if isinstance(label, Proveedores):
            label = label.nombre  # Mostrar solo el nombre del proveedor
        return super().create_option(name, value, label, selected, index, subindex, attrs)
    
class PedidoForm(forms.ModelForm):
    proveedor = forms.ModelChoiceField(
        queryset=Proveedores.objects.all(),
        widget=ProveedorSelect(attrs={'class': 'form-control'}),
        empty_label='Seleccione un proveedor'  # Texto opcional para el primer option
    )
    
    productos = forms.ModelMultipleChoiceField(
        queryset=Producto.objects.none(),
        widget=forms.SelectMultiple(attrs={'class': 'form-control'}),
        required=False
    )
    
    class Meta:
            model = Pedido
            fields = ['categoria', 'proveedor', 'productos', 'cantidad', 'precio_unitario', 'descripcion']
            widgets = {
            'cantidad': forms.NumberInput(attrs={'class': 'form-control'}),
            'precio_unitario': forms.NumberInput(attrs={'class': 'form-control'}),
            'total': forms.NumberInput(attrs={'class': 'form-control'}),
            'descripcion': forms.TextInput(attrs={'class': 'form-control'}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['proveedor'].label_from_instance = lambda obj: obj.nombre if obj else ''

        if 'proveedor' in self.data:
            proveedor_id = int(self.data['proveedor'])
            self.fields['productos'].queryset = Producto.objects.filter(proveedor_id=proveedor_id)
        elif self.instance.pk and self.instance.proveedor:
            self.fields['productos'].queryset = self.instance.productos.all()
    
    def clean(self):
        cleaned_data = super().clean()
        proveedor = cleaned_data.get('proveedor')
        if proveedor:
            self.fields['productos'].queryset = Producto.objects.filter(proveedor=proveedor)
        return cleaned_data
        
    def clean_cantidad(self):
            cantidad = self.cleaned_data.get('cantidad')
            if cantidad <= 0:
                raise ValidationError('La cantidad no puede ser cero o menor.')
            return cantidad
    
    def clean_precio_unitario(self):
            precio_unitario = self.cleaned_data.get('precio_unitario')
            if precio_unitario <= 0:
                raise ValidationError('El precio unitario debe ser mayor a 0.00.')
            return precio_unitario
    
class ActualizarEstadoPedidoForm(forms.ModelForm):
    class Meta:
        model = Pedido
        fields = ['estado']
        widgets = {
            'estado': forms.Select(attrs={'class': 'form-control'})
        }

class ProveedoresForm(forms.ModelForm):
    class Meta:
        model = Proveedores
        fields = ['nombre', 'ruc', 'telefono']
        widgets = {
            
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'ruc': forms.TextInput(attrs={'class': 'form-control'}),
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            
        }