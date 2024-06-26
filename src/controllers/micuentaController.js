const path = require("path");
const jwt = require("jsonwebtoken");
const Validaciones = require("../utils/userValidator");
const micuentaModel = require("../models/mysql/micuentaModel");

const { SECRET_JWT_KEY } = require("../utils/config");

class micuentaController {
  static ingresar(req, res) {
    res.sendFile("micuenta.html", { root: path.join(__dirname, "../views") });
  }

  static async getAll(req, res) {
    const { rol } = req.query;
    const usuarios = await micuentaModel.getAll({ rol });
    res.json(usuarios);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const usuario = await micuentaModel.getById({ id });
    res.json(usuario);
  }

  static async getByUsername(req, res) {
    const { username } = req.params;
    // console.log(username);
    const usuario = await micuentaModel.getByUsuario({ username });
    res.json(usuario);
  }

  static async login(req, res) {
    const { username, password } = req.body;
    // console.log(username, password);
    Validaciones.username(username);
    Validaciones.password(password);

    try {
      const user = await micuentaModel.login({ username, password });

      const token = jwt.sign(
        { id: user._id, username: user.username },
        SECRET_JWT_KEY,
        { expiresIn: "1h" }
      );
      res
        .cookie("access-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .send({ user, token });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }

  static async create(req, res) {
    const { username, password, rol } = req.body;
    // console.log(req.body);

    try {
      const id = await micuentaModel.create({ username, password, rol });
      res.send({ id });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static logout(req, res) {
    res.clearCookie("access-token").send({ ok: true });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await micuentaModel.delete({ id });
    res.send({ result });
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { username, password, rol } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      // console.log("Updating user with ID:", id);
      // console.log("New values:", { username, password, rol });

      const result = await micuentaModel.update({
        id,
        username,
        password,
        rol,
      });

      if (!result) {
        return res
          .status(404)
          .json({ error: "User not found or update failed" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error during update operation:", error);
      res.status(500).json({ error: error.message });
    }
  }

  static protected(req, res) {
    console.log("Ingresando a la ruta protegida"); // Log para verificar que se ingresa al método
    console.log(req.session); // Verifica el contenido de la sesión
    const { user } = req.session;
    if (!user) {
      console.log("Usuario no autorizado"); // Log para verificar autorización
      return res.status(403).sendFile("unauthorized.html", { root: path.join(__dirname, "../views") }); // Enviar una página de error si es necesario
    }

    res.sendFile("micuenta2.html", { root: path.join(__dirname, "../views") });
  }
}

module.exports = micuentaController;
