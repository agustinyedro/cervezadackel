import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { configureDropdowns } from "./validacionDeDatos/dropdowns.js";
import { focus } from "./validacionDeDatos/eliminarError.js";

/********* DROPDOWNS *********/
configureDropdowns(document.querySelectorAll(".motivo"));

/********* BOTONES *********/

const btnWhatsapp = document.querySelector(".whatsapp");
const btnEnviar = document.getElementById("enviar");

function obtenerDatosFormulario() {
  const nombre = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("phone").value;
  const motivo = document.querySelector(".select .selected").textContent;
  const mensage = document.getElementById("message").value;
  
  return { nombre, email, telefono, motivo, mensage };
}

btnWhatsapp.addEventListener("click", (event) => {
  event.preventDefault();

  const datosValidados = validarDatos(document.querySelector("form"));

  if (datosValidados !== false) {
    const { nombre, email,telefono, motivo, mensage} = obtenerDatosFormulario();
    const medio = "whatsapp";

    // console.log(motivo);
    fetch("/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email,telefono, motivo, mensage, medio }),
    })
      .then((res) => {
        if (res.ok) {
          window.open(
            `https://wa.me/+542214779519/?text=Hola,%20soy%20${nombre}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${mensage}%20`
          );
        } else {
          console.error("Error al enviar el formulario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  const resultadoValidacion = validarDatos(document.querySelector("form"));
  // console.log(resultadoValidacion);

  if (resultadoValidacion !== false) {
    const { nombre, email,telefono, motivo, mensage} = obtenerDatosFormulario();
    const medio = "correo electrónico";

    //  console.log(nombre,motivo);
    fetch("/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  nombre, email,telefono, motivo, mensage, medio }),
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/gracias";
      } else {
        console.error("Error al enviar el formulario");
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
});




/******* BORRAR TODOS LOS ERRORES ********/

focus(document.getElementById("name"));
focus(document.getElementById("email"));
focus(document.getElementById("phone"));
focus(document.getElementById("message"));
focus(document.getElementById("motivo"));
