const login = () => {
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
                if (data.response === true) {
                    window.location.replace('inicio.html');
                } else {
                    if (data.response === 'usuario') {
                        alert('El username no existe!');
                    } else if (data.response === 'password') {
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