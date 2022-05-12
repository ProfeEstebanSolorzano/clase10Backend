const { request } = require('express');
const express = require('express');

const app = express();

const options = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['html', 'htm'],
    index: false,
    redirect: false
}
app.use(express.static('public', options))

app.get('/hola', (request, response) => {
    console.log(request);
    response.send('Hola Mundo, este es mi servidor super mega chiva!!!');
});

app.get('/', (request, response) => {
    response.send('Inicio');
});

app.get('/quiz', (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`);
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor arriba y escuchando puerto 3000');
});