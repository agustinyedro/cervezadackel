// const { randomUUID } = require("node:crypto");
// const readJSON = require('../utils.js')

const fs = require("fs");
const path = require("path");

// Ruta relativa al archivo JSON
const filePath = path.join(__dirname, "../database/consultas.json");

// Leer el archivo JSON
let contactos;

try {
    const data = fs.readFileSync(filePath, "utf8");
    contactos = JSON.parse(data);
    // console.log(productos);
} catch (err) {
    console.error("Error al leer o parsear el archivo:", err);
}

class contactoModel {
    static async getAll({ motivo, medio } = {}) {
        // console.log("Fetching all contacts with filters:", { motivo, medio });

        // Si no hay filtros, devolver todas las contactos
        if (!medio && !motivo) {
            // console.log("No filters applied, returning all contacts.");
            return contactos;
        }

        // Filtrar las contactos según los filtros proporcionados
        const filteredcontactos = contactos.filter(contacto => {
            let isValid = true;
            if (medio) {
                isValid = isValid && contacto.medio.toLowerCase() === medio.toLowerCase();
            }
            if (motivo) {
                isValid = isValid && contacto.motivo.toLowerCase() === motivo.toLowerCase();
            }
            return isValid;
        });

        // console.log("Filtered contacts:", filteredcontactos);
        return filteredcontactos;
    }
    static async getById({ id }) {
        // Convertir id a string para asegurarse de que ambos id son del mismo tipo
        const parsedId = typeof id === "string" ? id : String(id);

        // Encontrar el producto por id
        const producto = contactos.find(
            (producto) => String(producto.id) === parsedId
        );

        return producto;
    }

    static async create({ input }) {
        const newcontacto = {
            id: contactos.length + 1,
            ...input,
        };

        contactos.push(newcontacto);

        return newcontacto;
    }

    static async delete({ id }) {
        console.log(id);
        const parsedId = typeof id === "string" ? id : String(id);

        // console.log(contactos.length);


        const contactoIndex = contactos.findIndex(
            (contacto) => String(contacto.id) === parsedId
        );


        // console.log(contactoIndex);
        if (contactoIndex === -1) return false;

        contactos.splice(contactoIndex, 1);
        return true;
    }
}

module.exports = contactoModel;