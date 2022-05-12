const procesarFormulario = () => {
    const persona = {};
    persona.username = document.querySelector('input[name="username"]').value;

    persona.password = document.querySelector('input[name="password"]').value;

    try {
        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(persona)
        }
        fetch('http://localhost:3000/login', opciones)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.replace('inicio.html');
                } else {
                    if (data === 'usuario') {
                        alert('El username no existe!');
                    } else if (data === 'password') {
                        alert('Password incorrecto');
                    } else {
                        alert('Error al loguear');
                    }
                }
            })
    } catch (e) {
        console.log(e)
    }

    return false;
}