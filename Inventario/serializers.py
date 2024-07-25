from rest_framework import serializers
#from .models import Producto, Categoria
from DATABIOS.Core.models import Producto,  Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'