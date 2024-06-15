const randomUUID = require('node:crypto')
const readJSON = require('../utils.js')

const productos = readJSON('./database/tienda.json')

class ProductoModel {
    static async getAll({ genre }) {
        if (genre) {
            return productos.filter(
                producto => producto.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }

        return productos
    }

    static async getById({ id }) {
        // Convertir id a string para asegurarse de que ambos id son del mismo tipo
        const parsedId = typeof id === 'string' ? id : String(id);

        // Encontrar el producto por id
        const producto = productos.find(producto => String(producto.id) === parsedId);

        return producto;
    }

    static async create({ input }) {

        const newproducto = {
            id: randomUUID(),
            ...input
        }

        productos.push(newproducto)

        return newproducto
    }

    static async delete({ id }) {
        const productoIndex = productos.findIndex(producto => producto.id === id)
        if (productoIndex === -1) return false

        productos.splice(productoIndex, 1)
        return true
    }

    static async update({ id, input }) {
        const productoIndex = productos.findIndex(producto => producto.id === id)
        if (productoIndex === -1) return false

        productos[productoIndex] = {
            ...productos[productoIndex],
            ...input
        }

        return productos[productoIndex]
    }
}

module.exports = ProductoModel