require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
// Configuración de middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: process.env.FRONT_URL || "http://localhost:5173", // Cambia a tu URL de frontend
    credentials: true,
  })
);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/tu_basede_datos"
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", indexRouter); // Todas las rutas estarán bajo /api



app.listen(() => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
module.exports = app;
