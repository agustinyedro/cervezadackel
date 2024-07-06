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

   static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await clienteModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar cliente"});
    }
  }


  
};



module.exports = clienteModel;

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
