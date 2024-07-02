async function getUserInfo() {
    try {
        const response = await fetch('/micuenta2/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Incluir las cookies en la solicitud
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        return null;
    }
}

// toma todos los datos del usuario

const userInfo = await getUserInfo();


/* si no existe el usuario */
if(!userInfo) {
    window.location = "/micuenta";
}

/* si existe el usuario */

/* Templates para el HTML */
const $template = document.getElementById("templates");

/* Bienvenida y Nombre de usuario */
const $nombre = document.querySelector(".nombre");
$nombre.textContent = `Bienvenido/a ${userInfo.username}`;

/*Boton de inicio */

const $btnInicio = document.getElementById("btn-inicio");

$btnInicio.addEventListener("click", async (event) => {
    event.preventDefault();
    $template.innerHTML = '';
    window.location = "/micuenta2";
});


/* Boton de direcciones */

const $btnDirecciones = document.getElementById("btn-direcciones");

$btnDirecciones.addEventListener("click", async (event) => {
    event.preventDefault();
    direcciones();
    
});

/* Botones de mis compras */

const $btnCompras = document.getElementById("btn-compras");

$btnCompras.addEventListener("click", async (event) => {
    event.preventDefault();
    compras();
});

/*boton de mi cuenta */

const $btnMiCuenta = document.getElementById("btn-mi-cuenta");

$btnMiCuenta.addEventListener("click", async (event) => {
    event.preventDefault();
    miCuenta();
    paises();
    
});


/* Boton cerrar sesion */

const $btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

$btnCerrarSesion.addEventListener("click", async (event) => {
    event.preventDefault();
    cerrarSesionTemplate();

    
    /* Boton para finalizar cerrar sesion */

    const $aCerrarSesion = document.getElementById("a-cerrar-sesion");
    $aCerrarSesion.addEventListener("click", async (event) => {
        event.preventDefault();
        cerraSesion();
    })
});
    
/***** Funciones *******/

//funcion para mostrar las compras
function compras() {
    $template.innerHTML = '';
    const template = document.getElementById("compras-sin-datos");
    const templateContent = template.content.cloneNode(true);
    $template.appendChild(templateContent);
}

/* Funcion para mostrar direcciones */

function direcciones() {
    $template.innerHTML = '';
    const template = document.getElementById("direcciones");
    const templateContent = template.content.cloneNode(true);
    
    $template.appendChild(templateContent);

    const $direccionFacturacion = document.querySelector(".p-direccion-facturacion");
    if(!userInfo.direccionFacturacion) {
        $direccionFacturacion.textContent = 'No hay direcciones configuradas';
    } else {
        $direccionFacturacion.textContent = userInfo.direccionFacturacion;
    }

    const $direccionEnvio = document.querySelector(".p-direccion-envio");
    if(!userInfo.direccionEnvio) {
        $direccionEnvio.textContent = 'No hay direcciones configuradas';
    } else {
        $direccionEnvio.textContent = userInfo.direccionFacturacion;
    }
}

function miCuenta() {
    $template.innerHTML = '';
    const template = document.getElementById("mi-cuenta");
    const templateContent = template.content.cloneNode(true);
    const $form = document.querySelector(".form-mi-cuenta");
    
    $template.appendChild(templateContent);
}

//funcion para mostrar template de cerrar sesion
function cerrarSesionTemplate() { 
    $template.innerHTML = '';
    const template = document.getElementById("cerrar-sesion");
    const templateContent = template.content.cloneNode(true);
    $template.appendChild(templateContent);

    const $nombreUsuario = document.querySelector(".p-cerrar-sesion");
    $nombreUsuario.textContent = `Hola ${userInfo.username}`;

    const $aCompras = document.querySelector(".a-pedidos");
    $aCompras.addEventListener("click", async (event) => {
        event.preventDefault();
        compras();
    })
}


//funcion para cerrar sesion
function cerraSesion() {
    fetch("/micuenta/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Incluir las cookies en la petición
    })
        .then((res) => {
            if (res.ok) {
                window.location = "/micuenta";
            } else {
                return res.json().then((data) => {
                    alert(data.message || "Error al cerrar la sesión");
                });
            }
        })
        .catch((error) => {
            console.error("There was a problem with your fetch operation:", error);
        });
}
function paises() {
// Tu código aquí
const input = document.getElementById('country-input');
const suggestionsContainer = document.getElementById('suggestions');

let countries = [];

fetch('/logic/paises.json')
    .then(response => response.json())
    .then(data => {
        countries = data;
    })
    .catch(error => {
        console.error('Error loading countries:', error);
    });

input.addEventListener('input', () => {
    const inputValue = input.value.toLowerCase();
    suggestionsContainer.innerHTML = '';

    if (inputValue) {
        const filteredCountries = countries.filter(country =>
            country.toLowerCase().includes(inputValue)
        );

        filteredCountries.forEach(country => {
            const suggestionItem = document.createElement('li');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = country;

            suggestionItem.addEventListener('click', () => {
                input.value = country;
                suggestionsContainer.innerHTML = '';
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    }
});

document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.innerHTML = '';
    }
});
}
    





