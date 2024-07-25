document.addEventListener('DOMContentLoaded', function() {
    const AddForm = document.getElementById('AddForm');
    const openAddForm = document.getElementById('openAddForm');
    const closeAddForm = document.getElementById('closeAddForm');
    const cancelButton = document.getElementById('cancelButton');

    const EditForm = document.getElementById('EditForm');
    const editButtons  = document.querySelectorAll('.edit_button');
    const closeEditForm = document.getElementById('closeEditForm');
    const cancelButtonEdit = document.getElementById('cancelButtonEdit');
    const myEditForm = document.getElementById('Edit__Form'); // Formilario editar
    
    const deleteButtons = document.querySelectorAll('.delete_button');

    const openViewButtons  = document.querySelectorAll('.openPermisos');
    const DialogView = document.getElementById('viewPermisos');
    const closeView = document.getElementById('viewPermisos');


    /* ADD dialog */ 
    openAddForm.addEventListener('click', function() {
        AddForm.showModal();
    });

    closeAddForm.addEventListener('click', function() {
        AddForm.close();
    });
    cancelButton.addEventListener('click', function() {
        AddForm.close();
    });

    /* All delete buttons */ 
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userIdDel = this.getAttribute('data-usuario-id');
            const deleteForm = document.getElementById('deleteForm');
            deleteForm.action = `/eliminar/${userIdDel}/`;

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
                    deleteForm.submit();
                }
            });
        });
    });

    /* EDIT dialog */ 
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-usuario-id');
            const username = this.getAttribute('data-usuario-username');
            const email = this.getAttribute('data-usuario-email');
            const nombre = this.getAttribute('data-usuario-nombre');
            const apellido = this.getAttribute('data-usuario-apellido');
            const categoria = this.getAttribute('data-usuario-categoria');

            console.log(userId);

            // Solicitar permisos del usuario, mediante Ajax
            fetch(`/editar_permisos/${userId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                $('#pedidos_pen_CUD').prop('checked', data.pedidos_pen_CUD);
                $('#pedidos_pen_S').prop('checked', data.pedidos_pen_S);
                $('#pedidos_rec_G').prop('checked', data.pedidos_rec_G);
                $('#inventario_cat_CUD').prop('checked', data.inventario_cat_CUD);
                $('#inventario_pro_CUD').prop('checked', data.inventario_pro_CUD);
                $('#inventario_pro_G').prop('checked', data.inventario_pro_G);
                $('#ventas_CD').prop('checked', data.ventas_CD);
                $('#panel_admin').prop('checked', data.panel_admin);
                
                $('#usernameEdit').val(username);
                $('#emailEdit').val(email);
                $('#nombreEdit').val(nombre);
                $('#apellidoEdit').val(apellido);
                $('#categoriaEdit').val(categoria);

                myEditForm.action = `/editar_permisos/${userId}/`;
                console.log(myEditForm.action);
                EditForm.showModal();
            })
            .catch(error => console.error('Error:', error));
        });
    });

    closeEditForm.addEventListener('click', function() {
        EditForm.close();
    });

    cancelButtonEdit.addEventListener('click', function() {
        EditForm.close();
    });

    /* VIEW PERMISOS dialog */ 
    openViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-usuario-id');
            console.log(userId);
            fetch(`/editar_permisos/${userId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const contPerm = document.getElementById('viewPermisos_content');
                const enabled = `<div class="enabled confirm_estate"><i class="fas fa-check"></i></div>`
                const disabled = `<div class="disabled confirm_estate"><i class="fas fa-times"></i></div>`
                const myPerms = `
                <div class="PermissionsRow">
                    <span>Pedidos Pendientes CUD:</span>${data.pedidos_pen_CUD ? enabled : disabled}
                </div>
                <div class="PermissionsRow">
                    <span>Pedidos Pendientes S:</span>${data.pedidos_pen_S ? enabled : disabled}
                </div>
                <div class="PermissionsRow">
                    <span>Pedidos Recibidos G:</span>${data.pedidos_rec_G ? enabled : disabled}  
                </div>
                <div class="PermissionsRow">
                    <span>Inventario Categoría CUD:</span>${data.inventario_cat_CUD ? enabled : disabled}  
                </div>
                <div class="PermissionsRow">
                    <span>Inventario Producto CUD:</span>${data.inventario_pro_CUD ? enabled : disabled}  
                </div>
                <div class="PermissionsRow">
                    <span>Inventario Producto G:</span>${data.inventario_pro_G ? enabled : disabled}  
                </div>
                <div class="PermissionsRow">
                    <span>Ventas CD:</span>${data.ventas_CD ? enabled : disabled}  
                </div>
                <div class="PermissionsRow">
                    <span>Panel Admin:</span>${data.panel_admin ? enabled : disabled}  
                </div>
            `;
                contPerm.innerHTML = myPerms;
                DialogView.showModal();
            })
            .catch(error => console.error('Error:', error));
        });
    });
    
    closeView.addEventListener('click', function() {
        DialogView.close();
    });
});
