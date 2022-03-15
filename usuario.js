import fs from 'fs';
class Usuario {
    constructor(usuario) {
        this.info = {};
        this.info.nombre = usuario.nombre;
        this.info.apellido = usuario.apellido;
        this.info.password = usuario.password;
        this.info.correo = usuario.correo;
        this.info.genero = usuario.genero;
        this.info.hobbies = usuario.hobbies;
        this.info.edad = usuario.edad;
        this.info.bio = usuario.bio;
    }

    async registrar() {
        const base = fs.readFileSync('./baseDeDatos.json', { encoding: 'utf8' });

        // const params = {
        //     method: 'POST',
        //     body: JSON.stringify(this.info),
        //     mode: 'no-cors', // no-cors, *cors, same-origin
        // };
        // const response = await fetch('http://localhost:3000/api/v1/registrar', params);

        // if (response) {
        //     location.href = "http://localhost:5500/frontEnd/login.html";
        // } else {
        //     alert('error registrando usuario')
        // }
    }

    autenticar(correo, pass) {

        if (correo !== this.correo) {
            return 'El correo no corresponde a ningún usuario registrado';
        }

        if (pass !== this.password) {
            return 'La contraseña es incorrecta';
        }
    }

    saludar() {
        return `Hola, mi nombre es ${this.info.nombre} y me gusta ${this.info.hobbies[0]}`
    }
}

export default Usuario