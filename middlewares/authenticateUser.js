const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "Acceso no autorizado. Token no proporcionado." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, error: "Token expirado." });
      }
      return res.status(401).json({ success: false, error: "Token inválido." });
    }

    req.user = decoded;

    next();
  });
};

module.exports = authenticateUser;
