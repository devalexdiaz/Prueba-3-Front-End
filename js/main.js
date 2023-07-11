// Obtener datos de la API
const url="https://restcountries.com/v3.1/lang/spanish";
let arrayDatos = [];
fetch(url)
.then(function(response){
    if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
    }
    return response.json();
})
.then(function(data){

    for (const pais in data) {
        const item = data[pais];
        const objeto={
            "pais":item.name.common,
            "capital":item.capital[0],
            "poblacion":item.population,
            "codigo":item.cca3
        };
        arrayDatos.push(objeto);
    }
    mostrarDatos();
})
.catch(function(error){
    console.log(error);
});

// Función para mostrar los datos de la API en la web
function mostrarDatos() {
    const tablaDatos = document.getElementById('tbody');
    tablaDatos.innerHTML = '';
  
    arrayDatos.forEach((pais, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${pais.pais}</td>
        <td>${pais.capital}</td>
        <td>${pais.poblacion}</td>
        <td>${pais.codigo}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarElemento(${index})">Eliminar</button>
        </td>
      `;
      tablaDatos.appendChild(fila);
    });
}

// Funcionalidad para el boton de eliminar elemento
function eliminarElemento(index) {
    if (index >= 0 && index < arrayDatos.length) {
        arrayDatos.splice(index, 1);
        mostrarDatos();
    }
}


let nombre = document.getElementById('nombre');
let capital = document.getElementById('capital');
let poblacion = document.getElementById('poblacion');
let codigo = document.getElementById('codigo');
