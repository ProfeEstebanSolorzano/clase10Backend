const express = require('express');

const app = express();

app.get('/hola', (request, response) => {
    console.log(request);
    response.send('Hola Mundo, este es mi servidor super mega chiva!!!');
});

app.get('/', (request, response) => {
    console.log(request);
    response.send('Inicio');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor arriba y escuchando puerto 3000');
});