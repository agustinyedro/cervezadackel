const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const { PORT } = require("./utils/config");

/* enlazo todo lo que esté en la carpeta static
 *
 *para llamar desde cualquier lugar del servidor /css o /img o /logic
 *
 *
 */
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas para servir vistas
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'ejs');

// Importar rutas
const indexRoute = require("./routes/indexRoutes");
const contactoRoute = require("./routes/contactoRoutes");
const graciasRoute = require("./routes/graciasRoutes");
const micuentaRoute = require("./routes/micuentaRoutes");
const nosotrosRoute = require("./routes/nosotrosRoutes");
const productoRoute = require("./routes/productoRoutes");
const registerRoute = require("./routes/registerRoutes");
const tiendaRoute = require("./routes/tiendaRoutes");
const micuenta2Route = require("./routes/usuario");

// Rutas
app.use("/", indexRoute);
app.use("/contacto", contactoRoute);
app.use("/gracias", graciasRoute);
app.use("/micuenta", micuentaRoute);
app.use("/nosotros", nosotrosRoute);
app.use("/productos", productoRoute);
app.use("/register", registerRoute);
app.use("/tienda", tiendaRoute);
app.use("/micuenta2", micuenta2Route);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
