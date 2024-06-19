import { validarDato } from './validarDato.js';
import { obtenerDatosFormularioDinamico } from './obtenerDatosForm.js';

export const validarDatos = (datos) => {
    const errores = [];
    const datosFormulario = obtenerDatosFormularioDinamico(datos);

    datosFormulario.forEach(dato => {
        const resultadoValidacion = validarDato(dato);
        if (resultadoValidacion !== true) {
            errores.push(resultadoValidacion);
        }
    });

    return errores.length > 0 ? false : datosFormulario;
};