import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { configureDropdowns } from "./validacionDeDatos/dropdowns.js";
import { focus } from "./validacionDeDatos/eliminarError.js";

/********* DROPDOWNS *********/
configureDropdowns(document.querySelectorAll(".motivo"));

/********* BOTONES *********/

const btnWhatsapp = document.querySelector(".whatsapp");
const btnEnviar = document.getElementById("enviar");

btnWhatsapp.addEventListener("click", () => {
  event.preventDefault();

  const datosValidados = validarDatos(document.querySelector("form"));

  if (datosValidados !== false) {
    const { name, email, motivo, mensaje } = datosValidados;

    window.open(
      `https://wa.me/+542214779519/?text=Hola,%20soy%20${name}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${mensaje}%20`
    );
  }
});

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  const resultadoValidacion = validarDatos(document.querySelector("form"));
  console.log(resultadoValidacion);

  if (resultadoValidacion !== false) {
    window.location.href = "./gracias.html";
  }
});


/******* BORRAR TODOS LOS ERRORES ********/

focus(document.getElementById("name"));
focus(document.getElementById("email"));
focus(document.getElementById("phone"));
focus(document.getElementById("message"));
focus(document.getElementById("motivo"));
