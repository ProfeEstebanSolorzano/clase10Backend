const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

const options = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'htm'],
    index: false,
    redirect: false
}
app.use(express.static('public', options));
app.use(express.static('public/formulario', options));
app.use(express.static('public/quiz', options));

app.use(express.json());
app.use(cors());

app.get('/hola', (request, response) => {
    response.send(`Hola Mundo, este es mi servidor super mega chiva!!!\n${__dirname}`);
});

app.get('/', (request, response) => {
    response.send('Inicio');
});

app.get('/registro', (request, response) => {
    response.sendFile(`${__dirname}/public/formulario/registro.html`);
});

app.get('/quiz', (request, response) => {
    response.sendFile(`${__dirname}/public/quiz/index.html`);
})

app.post('/registro', (request, response) => {
    const baseDeDatosString = fs.readFileSync('baseDeDatos.txt');
    const baseDeDatos = JSON.parse(baseDeDatosString);
    const persona = request.body;
    let existe = false;
    baseDeDatos.forEach(personaGuardada => {
        if (personaGuardada.username === persona.username) {
            existe = true;
        }
    });

    if (existe) {
        response.send(false);
    } else {
        baseDeDatos.push(persona);
        fs.writeFileSync('baseDeDatos.txt', JSON.stringify(baseDeDatos));
        response.send(true);
    }
});

app.post('/login', (request, response) => {
    console.log('entra')
    const baseDeDatosString = fs.readFileSync('baseDeDatos.txt');
    const baseDeDatos = JSON.parse(baseDeDatosString);
    const persona = request.body;
    let existe = false;
    baseDeDatos.forEach(personaGuardada => {
        if (personaGuardada.username === persona.username) {
            existe = true;
            if (personaGuardada.password === persona.password) {
                response.send({ response: true });
            } else {
                response.send({ response: 'password' });
            }
        }
    });
    if (!existe) {
        response.send({ response: 'usuario' });
    }
});

app.post('/quiz', (request, response) => {
    const baseDeDatosString = fs.readFileSync('baseDeDatosQuiz.txt');
    const baseDeDatos = JSON.parse(baseDeDatosString);
    const nota = request.body;
    baseDeDatos[nota.username] = nota.score;
    fs.writeFileSync('baseDeDatosQuiz.txt', JSON.stringify(baseDeDatos));
    response.send(baseDeDatos);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor arriba y escuchando puerto 3000');
});