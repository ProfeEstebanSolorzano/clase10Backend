import { createServer } from 'http';
import fs from 'fs';

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method == 'POST') {
        let finalData;
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', async() => {
            finalData = JSON.parse(body);
            if (req.url === '/api/v1/registrar') {
                console.log('Registrando', finalData);
                const resultadoRegistrar = await registrar(finalData);
                console.log(resultadoRegistrar);
                res.end(resultadoRegistrar)
            } else if (req.url === '/api/v1/login') {
                const response = await login(finalData);
                console.log('logueando: ', response)
                res.end();
            }
        });
    }
});
server.listen(3000);
console.log('escuchando puerto 3000');
const registrar = async(usuario) => {
    try {
        const data = fs.readFileSync('./baseDeDatos.json');
        const usuarios = JSON.parse(data);
        let unico = true;

        usuarios.forEach(usuarioGuardado => {
            if (usuarioGuardado.correo === usuario.correo) {
                unico = false;
            }
        })

        if (unico) {
            usuarios.push(usuario);
            fs.writeFileSync('./baseDeDatos.json', JSON.stringify(usuarios));
            return 'exito';
        } else {
            return 'El usuario ya existe';
        }
    } catch (e) {
        console.log(e);
        return 'error';
    }
}

const login = async(datos) => {
    let data = fs.readFileSync('./baseDeDatos.json');
    data = JSON.parse(data);
    let estaLogueado = false;
    data.forEach((usuario) => {
        if (usuario.correo === datos.correo) {
            if (usuario.password === datos.password) {
                console.log('entra')
                estaLogueado = true;
                return 'exito'
            } else {
                return 'contraseña incorrecta'
            }
        }
    });
    if (!estaLogueado) {
        return 'Correo incorrecto o controseña incorrecta'
    } else {
        return 'exito'
    }
}