import { cerrarSesion } from "./usuarios/cerrarSesion";
import { usuariosData } from "./usuarios/usuariosData";


/*********************/

let usuario;
async function obtenerDatosDeLaTarjeta() {
    try {
        usuario = await usuariosData();
        return usuario ? usuario : null;
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Ejecutar la función asíncrona cuando la página cargue
    await obtenerDatosDeLaTarjeta();
});

/************************/

const $cerrarSesionBoton = document.getElementById("cerrar-sesion-boton");


const urlParams = new URLSearchParams(window.location.search);
const usuarioId = urlParams.get("id");




$cerrarSesionBoton.addEventListener("click", (event) => {
    event.preventDefault();

    cerrarSesion();
})