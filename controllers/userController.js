const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "El correo electrónico ya está registrado.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ nombre, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor." });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Credenciales inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expira en 1 hora
    );

    res.status(200).json({
      success: true,
      token,
      message: "Inicio de sesión exitoso.",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor." });
  }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Contraseña actual incorrecta." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error interno del servidor." });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Buscar al usuario por ID en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Devolver la información del usuario
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const tokenBlacklist = [];
const logoutUser = (req, res) => {
  try {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization.split(' ')[1];

    // Verificar si el token ya está en la lista negra
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ success: false, error: 'El token ya está invalidado.' });
    }

    // Invalidar el token agregándolo a la lista negra
    tokenBlacklist.push(token);

    // Respuesta exitosa
    res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente.' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor.' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  changePassword,
  getUserById,
  logoutUser,
};
