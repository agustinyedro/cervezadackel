import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { focus } from "./validacionDeDatos/eliminarError.js";
// import { usuariosData } from "./usuarios/usuariosData.js";


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

if (userInfo) {
  window.location = "/micuenta2";
}

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
