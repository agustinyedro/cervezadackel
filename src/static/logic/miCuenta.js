import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { focus } from "./validacionDeDatos/eliminarError.js";
import { usuariosData } from "./usuarios/usuariosData.js";

const $btnIngresar = document.getElementById("btn-ingresar");

$btnIngresar.addEventListener("click", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  fetch("/micuenta/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: name, password: password }),
  })
    .then((res) => {
      if (res.ok) {
        window.location = "/micuenta/protegido";
      } else {
        return res.json().then((data) => {
          alert(data.message || "Usuario o contraseña incorrectos");
        });
      }
    })
    .catch((error) => {
      console.error(error.message);
      // alert("Error en la solicitud");
    });
});

focus(document.getElementById("name"));
focus(document.getElementById("password"));
// let usuariosA = [];
