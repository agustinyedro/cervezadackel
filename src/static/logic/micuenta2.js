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


const userInfo = await getUserInfo();

if(!userInfo) {
    window.location = "/micuenta";
}

/* si existe el usuario */

/* Templates para el HTML */
const $template = document.getElementById("templates");


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


/* Botones de mis compras */

const $btnCompras = document.getElementById("btn-compras");

$btnCompras.addEventListener("click", async (event) => {
    event.preventDefault();
    compras();
});
    

function compras() {
    $template.innerHTML = '';
    const template = document.getElementById("compras-sin-datos");
    const templateContent = template.content.cloneNode(true);
    $template.appendChild(templateContent);
}

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
    





