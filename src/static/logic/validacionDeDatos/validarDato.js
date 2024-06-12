const mensajesError = {
  name: "Por favor, ingrese su nombre.",
  email: "Por favor, ingrese su correo electrónico.",
  phone: "Por favor, ingrese su teléfono.",
  motivo: "Por favor, seleccione un motivo.",
  message: "Por favor, ingrese su mensaje.",
  password: "Por favor, ingrese su contraseña."
};

const crearMensajeError = (mensaje, id) => {
  const error = document.createElement("p");
  error.textContent = mensaje;
  error.classList.add(id, "error");
  return error;
};

const removerMensajeError = (id) => {
  const existingError = document.querySelector(`.${id}.error`);
  if (existingError) {
    existingError.remove();
  }
};

export function validarDato(input) {
  const { id, value } = input;

  removerMensajeError(id);

  if (value === "" || (id === "motivo" && document.querySelector(".selected").textContent === "Motivo")) {
    const mensaje = mensajesError[id];
    const error = crearMensajeError(mensaje, id);
    input.insertAdjacentElement("afterend", error);
    return mensaje;
  }

  return true;
}
