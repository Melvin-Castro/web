document.addEventListener('DOMContentLoaded', function() {
    // Dialog Crear Productos
    const DialogAdd = document.getElementById('DiaInvProAdd')
    const openDialogAdd = document.getElementById('openDiaInvProAdd')
    const closeDialogAdd = document.getElementById('closeDiaInvProAdd')
    const cancelDialogAdd = document.getElementById('cancelDiaInvProAdd') 
    // Dialog Editar Productos
    const DialogEdit = document.getElementById('DiaInvProEdit');
    const openDialogEditButtons =  document.querySelectorAll('.openDiaInvProEdit');
    const closeDialogEdit = document.getElementById('closeDiaInvProEdit');
    const cancelDialogEdit = document.getElementById('cancelDiaInvProEdit');
    const myEditForm = document.getElementById('editarPro__Form');

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
