document.addEventListener('DOMContentLoaded', function() {
    const AddCatProForm = document.getElementById('DiaInvCatCrear'); // Dialogo para crear
    const openAddCatProForm = document.getElementById('openInvCatCrear');
    const closeAddCatProForm = document.getElementById('closeInvCatCrear');
    const cancelAddCatProButton = document.getElementById('cancelInvCatCrear');
    // Editar
    const EditCatProForm = document.getElementById('DiaInvCatEdit'); // Dialogo para editar
    const editCatProButtons  = document.querySelectorAll('.editCatPro-button');
    const closeEditForm = document.getElementById('closeInvCatEdit');
    const cancelButtonEdit = document.getElementById('cancelButtonEdit');
    const myEditForm = document.getElementById('editarCatPro__Form');
    // Eliminar
    const deleteCatProButtons = document.querySelectorAll('.deleteCatPro-button');
    openAddCatProForm.addEventListener('click', function() {
        AddCatProForm.showModal();
    });

    closeAddCatProForm.addEventListener('click', function() {
        AddCatProForm.close();
    });
    cancelAddCatProButton.addEventListener('click', function() {
        AddCatProForm.close();
    });
    
    deleteCatProButtons.forEach(button => {
        button.addEventListener('click', function() {
            const catIdDel = this.getAttribute('data-categoria-id');
            const deleteCatForm = document.getElementById('deleteCatForm');
            deleteCatForm.action = `/inventario/categorias/eliminar/${catIdDel}/`;

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
                    deleteCatForm.submit();
                }
            });
        });
    });

    
    editCatProButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const catId = this.getAttribute('data-categoria-id');
            const catNom = this.getAttribute('data-categoria-nombre');
            const catDes = this.getAttribute('data-categoria-descripcion');

            $('#nombre_Cat_E').val(catNom);
            $('#descripcion_Cat_E').val(catDes);

            myEditForm.action = `/inventario/categorias/editar/${catId}/`;
            EditCatProForm.showModal();
        });
        
    });

    closeEditForm.addEventListener('click', function() {
        EditCatProForm.close();
    });
    cancelButtonEdit.addEventListener('click', function() {
        EditCatProForm.close();
    });
});
