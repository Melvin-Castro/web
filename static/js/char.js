document.addEventListener('DOMContentLoaded', function() {
    let space = '      ';
    // Chart 1: doughnut
    let original_labels = ['Producto1' + space, 'Producto2', 'Producto3', 'Producto4', 'Producto5' + space];
    let changed_labels = original_labels;
    let original_data = [98, 12, 11, 9, 6];
    let changed_data = original_data;

    const selectProduct = document.getElementById('categories');
    selectProduct.value = 'Todos';

    selectProduct.addEventListener('change', function(event) {
        const selectedValue = event.target.value.trim();
        //console.log(selectedValue);
        if (selectedValue === 'Todos') {
            changed_data = original_data;
            changed_labels = original_labels;
        } else {
            changed_data = [];
            changed_labels = [];

            for (let i = 0; i < Number(selectedValue); i++) {
                changed_data[i] = original_data[i];
                changed_labels[i] = original_labels[i];
            }
        }
        //console.log(changed_labels);
        myChart.data.datasets[0].data = changed_data;
        myChart.data.labels = changed_labels;
        myChart.update();
    });

    // Chart 2  and 3: bar
    let months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];
    let month_data = [20, 30, 50, 10, 15, 34, 25];
    let update_months = months;
    let update_month_data =month_data;

    const selectFrom = document.getElementById('lineaVentasDesde');
    const selectTo = document.getElementById('lineaVentasHasta');
    selectFrom.value = '1';
    selectTo.value = '7';
    let cache = selectFrom.value;
    let cache2 = selectTo.value;

    selectFrom.addEventListener('change', function(event) {
        const selectedValue1 = event.target.value;
        const selectedValue2 = selectTo.value;
        if(Number(selectedValue1) > Number(selectedValue2)) {
            Swal.fire({
                icon: "error",
                title: "Lo siento.",
                text: "No puedes seleccionar valores menores."
            });
            selectFrom.value = cache;
        } else {
            cache = selectFrom.value;
            update_months = [];
            update_month_data = [];
            let j = 0;
            for (let i = Number(selectedValue1); i <= Number(selectedValue2); i++) {
                update_months[j] = months[i-1];
                update_month_data[j] = month_data[i-1];
                j++;
            }
            
            myChart2.data.labels = update_months; // Actualiza las etiquetas (labels)
            myChart2.data.datasets[0].data = update_month_data; // Actualiza los datos del dataset
            myChart2.update();

            myChart3.data.labels = update_months; // Actualiza las etiquetas (labels)
            myChart3.data.datasets[0].data = update_month_data; // Actualiza los datos del dataset
            myChart3.update();
 
        }

    });

    selectTo.addEventListener('change', function(event) {
        const selectedValue2 = event.target.value.trim();
        const selectedValue1 = selectFrom.value;

        if(Number(selectedValue1) > Number(selectedValue2)) {
            Swal.fire({
                icon: "error",
                title: "Lo siento.",
                text: "No puedes seleccionar valores menores."
            });
            selectTo.value = cache2;
        } else {
            cache2 = selectTo.value;
            update_months = [];
            update_month_data = [];
            let j = 0;
            for (let i = Number(selectedValue1); i <= Number(selectedValue2); i++) {
                update_months[j] = months[i-1];
                update_month_data[j] = month_data[i-1];
                j++;
            }
            myChart2.data.labels = update_months; // Actualiza las etiquetas (labels)
            myChart2.data.datasets[0].data = update_month_data; // Actualiza los datos del dataset
            myChart2.update();

            myChart3.data.labels = update_months; // Actualiza las etiquetas (labels)
            myChart3.data.datasets[0].data = update_month_data; // Actualiza los datos del dataset
            myChart3.update();
        }
    });
    // Chart 1: doughnut
    // setup 
    const data = {
        labels: changed_labels,
        datasets: [{
            label: 'Productos más vendidos',
            data: changed_data,
            backgroundColor: [
                'rgba(255, 26, 104)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)'
            ],
            borderColor: 'white'
        }]
    };

    // options
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'left'
            }
        },
    };

    // config 
    const config = {
        type: 'doughnut',
        data,
        options
    };

    // render init block
    const myChart = new Chart(
        document.getElementById('myChart').getContext('2d'),
        config
    );

    // ===============================================================================================
    // Chart 2: line
    // setup 
    const data2 = {
        labels: update_months,
        datasets: [{
            label: 'Productos más vendidos',
            data: update_month_data,
            backgroundColor: [
                '#a8c9ff',
                '#74a4ff',
                '#00044a'
            ],
            borderWidth: 1
        }]
    };

    const options2 = {
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          x: {
            grid: {
              display: true
            }
          },
          y: {
            grid: {
              display: true
            }
          }
        },
        barPercentage: 1, // ajusta el ancho de las barras (0-1)
      };

    // config 
    const config2 = {
        type: 'bar',
        data: data2,
        options: options2
    };

    // render init block
    const myChart2 = new Chart(
        document.getElementById('myChart2').getContext('2d'),
        config2
    );

        // ===============================================================================================
    // Chart 3: radar
    // setup 
    const data3 = {
        labels: update_months,
        datasets: [{
            label: 'Productos más vendidos',
            data: update_month_data,
            fill: true,
            backgroundColor: [
                '#e4f0ff'
            ],
            borderColor: '#74a4ff',
            pointBackgroundColor: '#00044a',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        }]
    };

    const options3 = {
        plugins: {
            legend: {
                display: false
            }
        },
    };

    // config 
    const config3 = {
        type: 'radar',
        data: data3,
        options: options3
    };

    // render init block
    const myChart3 = new Chart(
        document.getElementById('myChart3').getContext('2d'),
        config3
    );
});
