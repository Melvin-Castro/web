document.addEventListener('DOMContentLoaded', function() {
    /*MESSAGES*/
    const messageContainer = document.getElementById('message-container');
    if (messageContainer && messageContainer.children.length > 0) {
        const messages = Array.from(messageContainer.children).map(div => ({
            tag: div.getAttribute('data-tag'),
            text: div.getAttribute('data-text')
        }));

        messages.forEach(message => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: message.tag.includes('success') ? 'success' :
                      message.tag.includes('error') ? 'error' :
                      message.tag.includes('warning') ? 'warning' : 'info',
                title: message.text,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
        });
    }
});