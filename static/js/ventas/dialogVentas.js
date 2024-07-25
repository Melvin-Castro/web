document.addEventListener('DOMContentLoaded', function() {
    // Dialog Crear Productos
    const DialogAdd = document.getElementById('DiaVentaAdd')
    const openDialogAdd = document.getElementById('openDiaVentaAdd')
    const closeDialogAdd = document.getElementById('closeDiaVentaAdd')
    const cancelDialogAdd = document.getElementById('cancelDiaVentaAdd') 
    // Dialog Editar Productos
    const DialogEdit = document.getElementById('DiaInvProEdit');
    const openDialogEditButtons =  document.querySelectorAll('.openDiaInvProEdit');
    const closeDialogEdit = document.getElementById('closeDiaInvProEdit');
    const cancelDialogEdit = document.getElementById('cancelDiaInvProEdit');
    const myEditForm = document.getElementById('editarPro__Form');
    // Tabla de prodcutos al crear venta
    const productoSelect = document.getElementById('producto_select');
    const unidadesInput = document.getElementById('unidades_input');
    const agregarProductoBtn = document.getElementById('agregarProducto');
    const productosTable = document.getElementById('productosTable').querySelector('tbody');
    const totalVentaSpan = document.getElementById('totalVenta');
    const totalVentaInput = document.getElementById('total-venta');
    let rowCount = 0;
    //
    function actualizarTotal() {
        let total = 0;
        productosTable.querySelectorAll('tr').forEach(row => {
            total += parseFloat(row.querySelector('.importe').textContent.replace('S/. ', ''));
        });
        totalVentaSpan.textContent = `S/. ${total.toFixed(2)}`;
        totalVentaInput.value = total.toFixed(2);
    }

    agregarProductoBtn.addEventListener('click', function() {
        const productoId = productoSelect.value;
        const productoNombre = productoSelect.options[productoSelect.selectedIndex].text;
        const precioUnitario = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precio);
        const unidades = parseInt(unidadesInput.value);

        if (productoId && unidades > 0) {
            rowCount++;
            const importe = precioUnitario * unidades;
            const newRow = productosTable.insertRow();
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td>${productoNombre}</td>
                <td>S/. ${precioUnitario.toFixed(2)}</td>
                <td>${unidades}</td>
                <td class="importe">S/. ${importe.toFixed(2)}</td>
                <td><button type="button" class="btn-remove">Eliminar</button></td>
            `;
            newRow.dataset.productoId = productoId;

            actualizarTotal();

            // Resetear selección
            productoSelect.value = '';
            unidadesInput.value = '1';

            // Agregar evento para eliminar fila
            newRow.querySelector('.btn-remove').addEventListener('click', function() {
                productosTable.removeChild(newRow);
                actualizarTotal();
            });
        }
    });

    // Manejar el envío del formulario
    document.getElementById('ventaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);

        document.querySelectorAll('#productosTable tbody tr').forEach((row, index) => {
            formData.append(`producto_id_${index}`, row.dataset.productoId);
            formData.append(`producto_unidades_${index}`, row.querySelector('td:nth-child(4)').textContent);
        });

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Venta creada exitosamente');

                const tableBody = document.getElementById('ventas-table-body');
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${data.venta.id}</td>
                    <td><button class="btn btn-link btn-sm ver-detalle" data-venta-id="${data.venta.id}">...</button></td>
                    <td>${data.venta.vendedor}</td>
                    <td>${data.venta.fecha_creacion}</td>
                    <td>
                        <button class="btn btn-danger btn-sm eliminar-venta" data-venta-id="${data.venta.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(newRow);

                DialogAdd.close();
            } else {
                alert('Error al crear la venta: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al crear la venta');
        });
    });
    // Eliminar Productos
    const deleteButtons = document.querySelectorAll('.deleteInvPro-button');

    /* ADD dialog */
    openDialogAdd.addEventListener('click', function() {
        DialogAdd.showModal();
    });

    closeDialogAdd.addEventListener('click', function() {
        DialogAdd.close();
    });

    cancelDialogAdd.addEventListener('click', function() {
        DialogAdd.close();
    });
    
    /* All delete Buttons */
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const proIdDel = this.getAttribute('data-producto-id');
            const deleteProForm = document.getElementById('deleteProForm');
            deleteProForm.action = `/inventario/productos/eliminar/${proIdDel}/`;

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Los cambios no se podrán revertir.",
                icon: "warning",
                iconColor: "#d33",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, borrar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteProForm.submit();
                }
            });
        });
    });
    /* EDIT Dialog */
    openDialogEditButtons.forEach(button => {
        button.addEventListener('click', function(){
            const prodId = this.getAttribute('data-producto-id');
            const nombre = this.getAttribute('data-producto-nombre');
            const categorias = this.getAttribute('data-producto-categorias');
            const categoriasIds = categorias.split(',');
            const proveedor = this.getAttribute('data-producto-proveedor');
            const stock = this.getAttribute('data-producto-stock');
            const precioC = this.getAttribute('data-producto-precio-C');
            const precioV = this.getAttribute('data-producto-precio-V');
            const stockMin = this.getAttribute('data-producto-stock-min');
            const stockMax = this.getAttribute('data-producto-stock-max');

            // Llenar los campos 
            $('#nombre_Prod_E').val(nombre);
            $('#categorias_Prod_E').val(categoriasIds);
            $('#proveedor_Prod_E').val(proveedor);
            $('#stock_Prod_E').val(stock);
            $('#precio_compra_Prod_E').val(precioC.replace(',', '.'));
            $('#precio_venta_Prod_E').val(precioV.replace(',', '.'));
            $('#stock_min_Prod_E').val(stockMin);
            $('#stock_max_Prod_E').val(stockMax);

            myEditForm.action = `/inventario/productos/editar/${prodId}/`;
            DialogEdit.showModal();
        });
    });
    closeDialogEdit.addEventListener('click', function(){
        DialogEdit.close();
    });
    cancelDialogEdit.addEventListener('click', function(){
        DialogEdit.close();
    });
});
