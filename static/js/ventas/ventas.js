document.addEventListener('DOMContentLoaded', function() {
    /* ADD */ 
    const myAddDialog = document.getElementById('addVentas');
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

    /* Mini table logic */ 
    let tableCon = $('#tableCon').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
        }
    });

    $('#addButton_min').click(function(event) {
        event.preventDefault();
    
        let productElement = $('#Productos option:selected');
        let productId = productElement.val();
        let productName = productElement.data('nombre');
        let productPrice = parseFloat(productElement.data('price'));
        let units = parseInt($('#Unidades').val());
        let send =  `${productId}-${units}`;
    
        let importAmount = productPrice * units;
        $('#Unidades').val(1);
    
        tableCon.row.add([
            productName,
            `S/.${productPrice.toFixed(2)}`,
            units,
            `S/.${importAmount.toFixed(2)}`,
            `<div class="flex_cont">
                <button type="button" class="delete_button openDelete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ]).draw(false);
    
        // Agregar producto al select múltiple
        updateHiddenSelect(send, productName, units);

        // Eliminar producto de la tabla y actualizar select múltiple
        $('#tableCon').on('click', '.delete_button', function() {
            tableCon.row($(this).parents('tr')).remove().draw();
            updateHiddenSelect();
        });

        updateTotal();
    });

    function updateHiddenSelect(send = null, productName = null, units = null) {
        let hiddenSelect = $('#Prod_back');

        if (send && productName && units) {
            // Agregar el producto al select múltiple
            hiddenSelect.append(new Option(productName, send, true, true));
        } else {
            // Limpiar el select múltiple y agregar los productos actuales en la tabla
            hiddenSelect.empty();
            tableCon.rows().every(function(rowIdx, tableLoop, rowLoop) {
                let data = this.data();
                hiddenSelect.append(new Option(data[0], send, true, true));
            });
        }
    }

    function updateTotal() {
        let total = 0;
        tableCon.rows().every(function(rowIdx, tableLoop, rowLoop) {
            let data = this.data();
            let importAmount = parseFloat(data[3].replace('S/.', ''));
            if (!isNaN(importAmount)) {
                total += importAmount;
            }
        });
        $('#totalAmount').text(total.toFixed(2));
    }
});