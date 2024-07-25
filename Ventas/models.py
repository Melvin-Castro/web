from django.db import models
from Core.models import Usuario, Producto

class Venta(models.Model):
    vendedor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Venta {self.id}"

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    unidades = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def importe(self):
        return self.unidades * self.precio_unitario

    def __str__(self):
        return f"Detalle de Venta {self.id}"