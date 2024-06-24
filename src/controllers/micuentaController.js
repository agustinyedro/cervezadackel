const path = require("path");

const jwt = require("jsonwebtoken");

const { Validaciones } = require("../../vadators/userValidator");

const micuentaModel = require("../models/mysql/micuentaModel");

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

  static async login(req, res) {
    const { username, password, rol } = req.body;

    Validaciones.username(username);
    Validaciones.password(password);

    try {
      const user = await micuentaModel.login({ username, password, rol });
      const token = jwt.sign(
        { id: user._id, username: user.username, rol: user.rol },
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
}

module.exports = micuentaController;
