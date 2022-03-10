import Usuario from './usuario.js';
import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/testUsuario', (req, res) => {
    const usuario = new Usuario({ "nombre": "Esteban", "apellido": "Solorzano", "password": "123", "correo": "asdfg@fhgasd.com", "genero": "male", "hobbies": ["Music", "Sports"], "edad": "18", "bio": "sadgasdfgagasd" });
    res.send(usuario.saludar());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})