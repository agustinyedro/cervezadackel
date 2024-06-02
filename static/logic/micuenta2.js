
const $cerrarSesionBoton = document.getElementById("cerrar-sesion-boton");
const $cerrar = document.getElementById("cerrar-sesion").content.cloneNode(true);



$cerrarSesionBoton.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.appendChild($cerrar);
})