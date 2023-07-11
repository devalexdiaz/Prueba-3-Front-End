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
            "nombre":item.name.common,
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
        <td>${pais.nombre}</td>
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

// Capturando inputs del formulario
let nombre = document.getElementById('nombre');
let capital = document.getElementById('capital');
let poblacion = document.getElementById('poblacion');
let codigo = document.getElementById('codigo');

// Capturando span de mensaje de error para cada input
let validNombre = document.getElementById('validNombre');
let validCapital = document.getElementById('validCapital');
let validPoblacion = document.getElementById('validPoblacion');
let validCodigo = document.getElementById('validCodigo');

// Capturando el formulario para ejecutar al hacer submit
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(event) {
  // Evitar recarga de página
  event.preventDefault();

  // Guardando valor de comprovación para evitar errores al mostrar span de error
  let nombreValido = validarNombre();
  let capitalValido = validarCapital();
  let poblacionValida = validarPoblacion();
  let codigoValido = validarCodigo();

  // Comprovando que las validaciones esten correctas para crear el diccionario con los datos
  if (nombreValido && capitalValido && poblacionValida && codigoValido) {
    const datosFormulario = {
      nombre: nombre.value,
      capital: capital.value,
      poblacion: poblacion.value,
      codigo: codigo.value,
    };
    // Agregando los datos al array de la tabla
    arrayDatos.push(datosFormulario);
    mostrarDatos();
    // Limpiando campos
    nombre.value = '';
    capital.value = '';
    poblacion.value = '';
    codigo.value = '';
  }
});

// Funciones para validación

function validarNombre() {
  let regex = /^[A-Za-z\s]+$/;
  if (!regex.test(nombre.value)) {
    validNombre.style.display = "block";
    validNombre.innerText = "Ingrese un nombre válido";
    validNombre.className = "text-danger";
    nombre.className = "form-control border-input-error";
    return false;
  }
  nombre.className = "form-control border-input-ok";
  validNombre.style.display = "none";
  return true;
}

function validarCapital() {
  let regex = /^[A-Za-z\s]+$/;
  if (!regex.test(capital.value)) {
    validCapital.style.display = "block";
    validCapital.innerText = "Ingrese una capital válida";
    validCapital.className = "text-danger";
    capital.className = "form-control border-input-error";
    return false;
  }
  capital.className = "form-control border-input-ok";
  validCapital.style.display = "none";
  return true;
}

function validarPoblacion() {
  let regex = /^\d+$/;
  if (!regex.test(poblacion.value) || parseInt(poblacion.value) < 0) {
    validPoblacion.style.display = "block";
    validPoblacion.innerText = "Ingrese población válida";
    validPoblacion.className = "text-danger";
    poblacion.className = "form-control border-input-error";
    return false;
  }
  poblacion.className = "form-control border-input-ok";
  validPoblacion.style.display = "none";
  return true;
}

function validarCodigo() {
  let regex = /^[A-Z]+$/;
  if (!regex.test(codigo.value)) {
    validCodigo.style.display = "block";
    validCodigo.innerText = "Ingrese un codigo válido y en mayúscula";
    validCodigo.className = "text-danger";
    codigo.className = "form-control border-input-error";
    return false;
  }
  codigo.className = "form-control border-input-ok";
  validCodigo.style.display = "none";
  return true;
}
