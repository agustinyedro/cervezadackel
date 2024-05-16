import { validarDato } from './validarDato.js';
import { obtenerDatosFormularioDinamico } from './obtenerDatosForm.js';
export const validarDatos = (datos) => {
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