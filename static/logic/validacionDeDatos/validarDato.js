export function validarDato(input, id) {
  const inputs = [
    { name: "name", message: "Por favor, ingrese su nombre." },
    { name: "email", message: "Por favor, ingrese su correo electrónico." },
    { name: "phone", message: "Por favor, ingrese su teléfono." },
    { name: "motivo", message: "Por favor, seleccione un motivo." },
    { name: "message", message: "Por favor, ingrese su mensaje." },
    { name: "password", message: "Por favor, ingrese su contraseña." },
  ];

  if (
    input.value === "" ||
    (input.id === "motivo" &&
      document.querySelector(".selected").textContent === "Motivo")
  ) {
    // Remover el error existente, si hay
    const existingError = document.querySelector(`.${input.id}.error`);
    if (existingError) {
      existingError.remove();
    }

    if (
      input.id === "motivo" &&
      document.querySelector(".selected").textContent === "Motivo"
    ) {
      const existingError = document.querySelector(".motivo.error");
      if (!existingError) {
        const error = document.createElement("p");
        error.textContent = "Por favor, seleccione un motivo.";
        error.classList.add("motivo");
        error.classList.add("error");
        input.after(error);
      }
    } else {
      inputs.forEach((value) => {
        if (value.name === id) {
          const existingError = document.querySelector(`.${value.name}.error`);
          if (!existingError) {
            const error = document.createElement("p");
            error.textContent = value.message;
            error.classList.add(value.name);
            error.classList.add("error");
            input.insertAdjacentElement("afterend", error);
          }
        }
      });
    }
    return false;
  } else {
    // Remover el error existente si el campo es válido
    const existingError = document.querySelector(`.${input.id}.error`);
    if (existingError) {
      existingError.remove();
    }
    return input;
  }
}
