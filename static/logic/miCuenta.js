import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { focus } from "./validacionDeDatos/eliminarError.js";
const $btnIngresar = document.getElementById("btn-ingresar");


$btnIngresar.addEventListener("click", (event) => {
    event.preventDefault();
    const datosValidados = validarDatos(document.querySelector("form"));
    console.log("hola");
    console.log(datosValidados);
    if (!Array.isArray(datosValidados)) {
        const { email, password } = datosValidados;
        const error = document.querySelector(`.${email.classList}.error`);
        if (error) {
            error.remove();
        }
    }
})

focus(document.getElementById("name"));
focus(document.getElementById("password"))