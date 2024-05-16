export function validarDato(input, id) {

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