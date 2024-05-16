const dropdowns = document.querySelectorAll(".motivo");
// let motivo = "";
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      // motivo = "" + selected.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});


/********* BOTONES *********/

const btnWhatsapp = document.querySelector(".whatsapp");
const btnEnviar = document.getElementById("enviar");


btnWhatsapp.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(document.querySelector("form")) // Almacenar el resultado de validarDatos
  if (!Array.isArray(datosValidados)) {
    const { name, email, motivo, mensaje } = datosValidados; // Obtener los datos
    const error = document.querySelector(`.${input.classList}.error`);
    if (error) {
      error.remove();
    }
    window.open(
      `https://wa.me/######/?text=Hola,%20soy%20${name}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${mensaje}%20`
    );
  }
});


btnEnviar.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(document.querySelector("form")); // Almacenar el resultado de validarDatos
  if (!Array.isArray(datosValidados)) {
    const { name, email, telefono, motivo, mensaje } = datosValidados; // Obtener los datos

    alert("Enviado");
    const error = document.querySelector(`.${input.classList}.error`);
    if (error) {
      error.remove();
    }
  }
});


const obtenerDatosFormularioDinamico = (formulario) => {
  const inputs = formulario.querySelectorAll("input, .motivo, textarea");
  const datos = [];

  inputs.forEach((input, index) => {
    if (input.type !== "submit") {

      datos[index] = input;

    }
  }
  );

  return datos;
};

const validarDatos = (datos) => {
  const errores = [];
  const datosFormulario = obtenerDatosFormularioDinamico(datos);

  for (let i = 0; i < datosFormulario.length; i++) {
    const dato = datosFormulario[i];
    const resultadoValidacion = validarDato(dato, dato.id);
    if (resultadoValidacion !== true) { // Si validarDato no retorna true, significa que hay un error
      errores.push(resultadoValidacion);
    }
  }

  if (errores.length > 0) {
    return errores;
  } else {
    return { datos };
  }
}

function validarDato(input, id) {

  const inputs = [
    { name: "name", message: "Por favor, ingrese su nombre." },
    { name: "email", message: "Por favor, ingrese su correo electrónico." },
    { name: "phone", message: "Por favor, ingrese su teléfono." },
    { name: "motivo", message: "Por favor, seleccione un motivo." },
    { name: "message", message: "Por favor, ingrese su mensaje." },
    { name: "password", message: "Por favor, ingrese su contraseña." }
  ];
  // console.log(input);
  // // console.log(input.id);

  if (input.value === "" || input.id === "motivo") {
    console.log(input);
    if (input.id === "motivo") {
      const selectElement = document.querySelector(".selected");
      if (selectElement.textContent === "Motivo") {
        const existingError = document.querySelector(".motivo.error");
        if (!existingError) { // Si no existe un mensaje de error, crea uno nuevo
          const error = document.createElement("p");
          error.textContent = "Por favor, seleccione un motivo.";
          error.classList.add("motivo");
          error.classList.add("error");
          input.after(error);
        }
      }
    } else {
      inputs.forEach((value) => {

        if (value.name === id) {

          const existingError = document.querySelector(`.${value.name}.error`);
          if (!existingError) { // Si no existe un mensaje de error, crea uno nuevo
            const error = document.createElement("p");
            error.textContent = value.message;
            error.classList.add(value.name);
            error.classList.add("error");
            input.insertAdjacentElement("afterend", error);
          }
        }
      });

    }

    return false
  } else {
    // console.log(input);
    return input
  }

}

const $name = document.getElementById("name");
const $email = document.getElementById("email");
const $phone = document.getElementById("phone");
const $motivo = document.getElementById("motivo");
const $message = document.getElementById("message");

$motivo.addEventListener("click", () => {
  const error = document.querySelector(`.${$motivo.classList}.error`);
  if (error) {
    error.remove();
  }
})


function focus(input) {
  console.log(input.classList);
  input.addEventListener("focus", () => {
    const error = document.querySelector(`.${input.classList}.error`);
    if (error) {
      error.remove();
    }
  })

}

focus($name);
focus($email);
focus($phone);
focus($message);

