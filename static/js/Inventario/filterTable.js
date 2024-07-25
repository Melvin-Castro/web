document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form_filtro_productos');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const csrfToken = formData.get('csrfmiddlewaretoken');

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('tabla_productos').innerHTML = data.html;
        })
        .catch(error => console.error('Error:', error));
    });
});
