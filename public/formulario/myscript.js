const boton = document.querySelector('#boton1');

boton.onclick = () => {

}
const colors = ['black', 'silver', 'gray', 'maroon', 'red', 'purple', 'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange', 'aliceblue', 'antiquewhite', 'aquamarine', 'azure', 'beige', 'bisque', 'blanchedalmond', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon'];

const persona = {
    username: '',
    password: '',
    pais: '',
    lenguaje: '',
    edad: '',
    transporte: []
}

const procesarFormulario = () => {
    persona.username = document.querySelector('input[name="username"]').value;

    persona.password = document.querySelector('input[name="password"]').value;
    persona.pais = document.querySelector('#country').value;

    persona.lenguaje = document.querySelector('input[name="fav_language"]:checked').value;

    persona.edad = document.querySelector('input[name="age"]:checked').value;

    const checkedTransport = document.querySelectorAll('input[type="checkbox"]:checked');

    checkedTransport.forEach(elementoDeLaLista => {
        persona.transporte.push(elementoDeLaLista.value);
    });

    try {
        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(persona)
        }
        fetch('http://localhost:3000/registro', opciones)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    window.location.replace('login.html');
                } else {
                    alert('Error registrando usuario');
                }
            })
    } catch (e) {
        console.log(e)
    }

    return false;
}