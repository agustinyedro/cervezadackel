import { validarDatos } from "./validacionDeDatos/validarDatos.js";
import { focus } from "./validacionDeDatos/eliminarError.js";
import { usuariosData } from "./usuarios/usuariosData.js";

const $btnIngresar = document.getElementById("btn-ingresar");

$btnIngresar.addEventListener("click", async (event) => {
  event.preventDefault();
  const datosValidados = validarDatos(document.querySelector("form"));

  const id = validarUsuarios(await cargarUsuarios());
  // console.log(datosValidados);
  // console.log(id);
  if (datosValidados !== false && id !== false) {
    // console.log(datosValidados);
    window.location.href = `../templates/micuenta2.html?id=${id}`;
  }
});

focus(document.getElementById("name"));
focus(document.getElementById("password"));
// let usuariosA = [];
async function cargarUsuarios() {
  try {
    const usuario = await usuariosData();
    if (usuario) {
      return usuario;
      // console.log("Usuarios cargados:", usuariosA);
    } else {
      // console.log("No se pudieron obtener los datos.");
    }
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
}

function validarUsuarios(usuario) {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  // console.log(usuariosA);

  for (let user of usuario) {
    if (user.username === name && user.password === password) {
      return user.id;
    }
  }
  return alert("Usuario o contraseña incorrectos");
}
