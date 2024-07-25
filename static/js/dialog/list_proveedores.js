document.addEventListener('DOMContentLoaded', function() {
    /* ADD */ 
    const myAddDialog = document.getElementById('addProveedores');
    const openAdd = document.getElementById('openAdd');
    const closeAdd = document.getElementById('closeAdd');
    const cancelAdd = document.getElementById('cancelAdd');

    /* ADD dialog */ 
    openAdd.addEventListener('click', function() {
        myAddDialog.showModal();
    });
    closeAdd.addEventListener('click', function() {
        myAddDialog.close();
    });
    cancelAdd.addEventListener('click', function() {
        myAddDialog.close();
    });
    
    /* EDIT */   
    const myEditDialog = document.getElementById('editProveedores');
    const openEditButtons = document.querySelectorAll('.openEdit');
    const closeEdit = document.getElementById('closeEdit');
    const cancelEdit = document.getElementById('cancelEdit');
    const formEdit = document.getElementById('formProv_Edit')

    const iptNombre = document.getElementById('id_nombre_edit');
    const iptRuc = document.getElementById('id_ruc_edit');
    const iptTelefono = document.getElementById('id_telefono_edit');

    /* EDIT dialog */ 
    openEditButtons.forEach(button => {
        button.addEventListener('click', function() {
            const Id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            const ruc = this.getAttribute('data-ruc');
            const telefono = this.getAttribute('data-telefono');

            iptNombre.value = nombre;
            iptRuc.value = Number(ruc);
            iptTelefono.value = telefono;

            formEdit.action =  `/inventario/proveedor/editar/${Id}/`;

            myEditDialog.showModal();
            console.log(Id, nombre, ruc, telefono);
        });
    });
    closeEdit.addEventListener('click', function() {
        myEditDialog.close();
    });
    cancelEdit.addEventListener('click', function() {
        myEditDialog.close();
    });

    /* DELETE */   
    const openDeleteButtons = document.querySelectorAll('.openDelete');
    openDeleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-usuario-id');
            const deleteProvForm = document.getElementById('formProv_Delete');
            deleteProvForm.action = `/inventario/proveedor/eliminar/${userId}/`;
            console.log(userId);
            
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
                    deleteProvForm.submit();
                    console.log("Confirmado");
                }
            });
        });
    });
});
