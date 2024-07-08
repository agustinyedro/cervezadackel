const clienteModel = require("../models/mysql/clienteModel");

const path = require("path");

class contactoController {
  static async getAll(req, res) {
    
    const clientes = await clienteModel.getAll();
    res.json(clientes);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const clientes = await clienteModel.getById({ id });
    if (clientes) return res.json(clientes);
    res.status(404).json({ message: "Contacto no encontrado" });
  }

  static async getByUser(req, res) {
    const { user_id } = req.params;
    const clientes = await clienteModel.getByUser({ user_id });
    if (clientes) return res.json(clientes);
    res.status(404).json({ message: "Contacto no encontrado" });
  }

  static async create(req, res) {
    // console.log("req.body", req.body);
    try {
       const newCliente = await clienteModel.create({ input: req.body });
        // console.log(req.body);
       res.status(201).json(newCliente);
    } catch (error) {
       res.status(500).json({ error: "Error al crear el contacto" });
      }
   }


// realizar controlador de update

static async update(req, res) {
  
  try {
    const { id } = req.params;
    const { Nombre, Apellido, Email, Direccion, Ciudad, Pais, CodigoPostal, Telefono, Estado, usuario_id } = req.body;
   //  const { id } = await clienteModel.update({ input: req.body });
    if ({ id }) return res.json({ id });
   //  res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: "Error cliente no encontrado" });
  }
  
 }


  static async delete(req, res) {
    const { id } = req.params;

    try {
        // Obtener usuario_id del parámetro de la solicitud
        const usuario_id = id;

        // Se borra el usuario primero
        const deleteUsuarioResult = await clienteModel.deleteUsuario(usuario_id);
        if (!deleteUsuarioResult) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Luego se borra el cliente asociado
        const deleteClienteResult = await clienteModel.deleteClienteByUsuarioId(usuario_id);
        if (!deleteClienteResult) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        // Si ambas acciones de borrado fueron exitosas, enviar una respuesta de éxito
        res.status(200).json({ message: "Usuario y cliente eliminados exitosamente" });

    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario y cliente" });
    }
  };

  
}


  // static async delete(req, res) {
  //   const { id } = req.params;
  //   // console.log(id);
  //   const result = await contactoModel.delete({ id });
  //   // console.log(result);
  //   if (result === false) {
  //     return res.status(404).json({ message: "Contacto no encontrado" });
  //   }

  //   return res.json({ message: "Contacto eliminado" });
  // }


module.exports = contactoController;
