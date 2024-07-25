$(document).ready(function() {
    try {
        // Inicializar DataTables
        const table = $('#myTable').DataTable({
            "paging": true,     
            "lengthChange": true,   
            "searching": true,      
            "ordering": true,   
            "info": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
            },
        });
    
        // Filtro personalizado para categorías (lista_usuarios.html)
        let categoryFilter = $('#categoryFilter');
    
        if (categoryFilter.length) { // Verifica si el elemento existe en el DOM
            categoryFilter.on('change', function() {
                var selectedCategory = $(this).val();
    
                try {
                    if (selectedCategory) {
                        table.column(0).search('^' + selectedCategory + '$', true, false).draw();
                    } else {
                        table.column(0).search('').draw();
                    }
                } catch (error) {
                    console.error('Error al aplicar el filtro de categoría:', error);
                }
            });
        } else {
            console.warn('Filtrado no corresponde a este DOM.');
        }

        // Filtro personalizado para categorías (lista_usuarios.html)
        const categoryFilterCat = $('#categoryFilterCat');
    
        if (categoryFilterCat.length) { // Verifica si el elemento existe en el DOM
            categoryFilterCat.on('change', function() {
                var selectedCategory = $(this).val();
    
                try {
                    if (selectedCategory) {
                        table.column(1).search('^' + selectedCategory + '$', true, false).draw();
                    } else {
                        table.column(1).search('').draw();
                    }
                } catch (error) {
                    console.error('Error al aplicar el filtro de categoría:', error);
                }
            });
        } else {
            console.warn('Filtrado no corresponde a este DOM.');
        }
    } catch (error) {
        console.error('Error al inicializar DataTables:', error);
    }

    try {
        // Inicializar DataTables
        const tablePro = $('#tablePro').DataTable({
            "paging": true,     
            "lengthChange": true,   
            "searching": true,      
            "ordering": true,   
            "info": true,
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
            },
            columnDefs: [
                {
                    targets: 1,
                    render: function(data, type, row) {
                        if (type === 'display') {
                            var listItems = $(data).find('li').map(function() {
                                return $(this).text();
                            }).get().join(', ');
                            return listItems;
                        }
                        return data;
                    }
                }
            ]
        });
        // Filtro personalizado para categorías (lista_usuarios.html)
        const categoryFilterPro = $('#categoryFilterPro');
    
        if (categoryFilterPro.length) { // Verifica si el elemento existe en el DOM
            categoryFilterPro.on('change', function() {
                var selectedCategory = $(this).val();    
                try {
                    if (selectedCategory) {
                        tablePro.column(1).search(selectedCategory, true, false).draw();
                    } else {
                        tablePro.column(1).search('').draw();
                    }
                } catch (error) {
                    console.error('Error al aplicar el filtro de categoría:', error);
                }
            });
        } else {
            console.warn('Filtrado no corresponde a este DOM.');
        }

    } catch (error) {
        console.error('Error al inicializar DataTables:', error);
    }
});