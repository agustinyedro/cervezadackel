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


/********* BOTON WHATSAPP *********/

const btnWhatsapp = document.querySelector(".whatsapp");
const btnEnviar = document.getElementById("enviar");


btnWhatsapp.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(); // Almacenar el resultado de validarDatos
  if (datosValidados !== false) {
    const { name, email, telefono, motivo, mensaje } = datosValidados; // Obtener los datos
    window.open(
      `https://wa.me/######/?text=Hola,%20soy%20${name}.%20Estoy%20interesado/a%20en%20${motivo}.%20Mi%20correo%20es:%20${email}.%20${mensaje}%20`
    );
  }
});

btnEnviar.addEventListener("click", () => {
  event.preventDefault();
  const datosValidados = validarDatos(); // Almacenar el resultado de validarDatos
  if (datosValidados !== false) {
    const { name, email, telefono, motivo, mensaje } = datosValidados; // Obtener los datos
    alert("Enviado");
  }
});




const validarDatos = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const telefono = document.getElementById("phone");
  const mensaje = document.getElementById("message");

  const motivo = document.querySelector(".motivo .selected");
  let datos = [name, email, telefono, motivo, mensaje];
  // Validar campos

  for (let i = 0; i < datos.length; i++) {
    if (!validarDato(datos[i], i)) {
      return false
    }
  }
  return {
    name,
    email,
    telefono,
    motivo,
    mensaje
  }
}

function validarDato(input, index) {

  const inputs = [
    { name: "name", message: "Por favor, ingrese su nombre." },
    { name: "email", message: "Por favor, ingrese su correo electrónico." },
    { name: "phone", message: "Por favor, ingrese su teléfono." },
    { name: "motivo", message: "Por favor, seleccione un motivo." },
    { name: "message", message: "Por favor, ingrese su mensaje." }
  ];
  // console.log(input);
  console.log(input.id);

  if (input.value === "" || input.textContent === "Motivo") {
    // console.log(`${inputs[index].message}`);
    const msjError = document.createElement("p");
    msjError.classList.add("error");
    msjError.innerText = `${inputs[index].message}`;

    console.log(input.id);

    // input.insertAdjacentElement("afterend", msjError);

    return false
  } else {
    // console.log(input);
    return input
  }

}
