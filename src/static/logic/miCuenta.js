import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { focus } from "./validacionDeDatos/eliminarError.js";

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
      console.error('No hay usuario, respuesta no ok:', response.statusText);
      return null;
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

  const $form = document.querySelector("form");
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  // Asegúrate de que la función validarDatos no esté causando problemas
  console.log("Validando datos del formulario...");
  if (validarDatos($form) !== false) {
    try {
      const response = await fetch("/micuenta/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, password: password }),
      });

      if (response.ok) {
        console.log("Inicio de sesión exitoso");
        window.location = "/micuenta/protegido";
      } else {
        const data = await response.json();
        console.error("Error de inicio de sesión:", data.message);
        alert(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      alert("Error en la solicitud");
    }
  } else {
    console.log("Datos del formulario no válidos");
  }
});

focus(document.getElementById("name"));
focus(document.getElementById("password"));

const togglePassword = document.querySelectorAll('.toggle-password');

togglePassword.forEach(icon => {
  icon.addEventListener('click', () => {
    const input = document.querySelector(icon.getAttribute('data-toggle'));
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
});
