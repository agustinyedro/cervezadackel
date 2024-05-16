import { validarDatos } from "./validacionDeDatos/validarDatos.js";

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


const $usuario = document.getElementById("name");
const $contrasena = document.getElementById("password");

function focus(input) {
    console.log(input.classList);
    input.addEventListener("focus", () => {
        const error = document.querySelector(`.${input.classList}.error`);
        if (error) {
            error.remove();
        }
    })

}

focus($usuario);
focus($contrasena)