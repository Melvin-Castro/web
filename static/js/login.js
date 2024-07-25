const eyeButton = document.getElementById('eyePass');
const iptPassword = document.getElementById('password');

eyeButton.addEventListener('click', function() {
    const estado = iptPassword.getAttribute('type');
    console.log(estado);

    if (estado === 'password') {
        iptPassword.setAttribute('type', 'text');
        eyeButton.classList.remove('fa-eye'); 
        eyeButton.classList.add('fa-eye-slash');
    } else if (estado === 'text') {
        iptPassword.setAttribute('type', 'password');
        eyeButton.classList.remove('fa-eye-slash'); 
        eyeButton.classList.add('fa-eye');
    }
});