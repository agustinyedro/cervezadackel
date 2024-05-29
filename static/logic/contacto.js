import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { configureDropdowns } from "./dropdowns.js";
import { focus } from "./validacionDeDatos/eliminarError.js";

/********* DROPDOWNS *********/
configureDropdowns(document.querySelectorAll(".motivo"));

/********* BOTONES *********/

const btnWhatsapp = document.querySelector(".whatsapp");
const btnEnviar = document.getElementById("enviar");

btnWhatsapp.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(document.querySelector("form")); // Almacenar el resultado de validarDatos
  let i = 0;
  datosValidados.forEach((input) => {
    console.log(input);
    if (input !== false) {
      i++;
    }
  });
  if (i === datosValidados.length) {
    const { name, email, motivo, mensaje } = datosValidados; // Obtener los datos

    window.open(
      `https://wa.me/+542214779519/?text=Hola,%20soy%20${name}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${mensaje}%20`
    );
  }
});

btnEnviar.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(document.querySelector("form")); // Almacenar el resultado de validarDatos
  let i = 0;
  datosValidados.forEach((input) => {
    // console.log(input);
    if (input !== false) {
      i++;
    }
  });

  // console.log(i);
  if (i === datosValidados.length) {
    window.location.href = "./gracias.html";
  }
});

/******* BORRAR TODOS LOS ERRORES ********/

focus(document.getElementById("name"));
focus(document.getElementById("email"));
focus(document.getElementById("phone"));
focus(document.getElementById("message"));
focus(document.getElementById("motivo"));
