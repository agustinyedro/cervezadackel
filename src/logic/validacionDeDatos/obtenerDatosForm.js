export const obtenerDatosFormularioDinamico = (formulario) => {
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