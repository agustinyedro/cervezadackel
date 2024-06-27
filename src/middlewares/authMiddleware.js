const jwt = require("jsonwebtoken");
const { SECRET_JWT_KEY } = require("../utils/config");

const authMiddleware = (req, res, next) => {
  const token = req.cookies["access-token"];

  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, SECRET_JWT_KEY);
      req.session.user = data;
        // console.log(data); // Establece el nombre de usuario en la sesión si el token es válido
    } catch (error) {
      console.error("Error al verificar el token JWT:", error.message);
      // Puedes manejar el error de manera específica, por ejemplo, redirigir a una página de inicio de sesión
      // o enviar una respuesta de error adecuada al cliente.
      // Aquí un ejemplo de cómo podrías responder con un estado 401 no autorizado:
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  next();
};

module.exports = authMiddleware;
