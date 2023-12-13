const Store = require("../models/store");
const User = require("../models/user");

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Tienda no encontrada." });
    }
    res.status(200).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const createStore = async (req, res) => {
  try {
    const { nombreNegocio, direccion, zona, horarioAtencion, telefono } =
      req.body;

    // Obtener el ID del usuario desde la solicitud
    const userId = req.user.userId; // Asumiendo que tienes el ID del usuario en la solicitud
    console.log(userId);
    // Crear una nueva tienda
    const newStore = new Store({
      nombreNegocio,
      direccion,
      telefono,
      zona,
      horarioAtencion,
    });
    await newStore.save();

    // Actualizar el usuario con el ID del nuevo store
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { store: newStore._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Tienda creada exitosamente.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const { nombreNegocio, direccion, telefono, zona, horarioAtencion } =
      req.body;

    // Buscar la tienda por ID
    const store = await Store.findByIdAndUpdate(
      storeId,
      {
        $set: {
          nombreNegocio,
          direccion,
          telefono,
          zona,
          horarioAtencion,
        },
      },
      { new: true }
    );

    if (!store) {
      return res.status(404).json({ error: "Tienda no encontrada." });
    }

    // Verificar si la tienda está asociada a algún usuario y actualizar el usuario
    const user = await User.findOne({ store: store._id });
    if (user) {
      user.store = store._id;
      await user.save();
    }

    res.status(200).json({ message: "Tienda actualizada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    // Eliminar la tienda por ID
    await Store.findByIdAndDelete(storeId);

    res.status(200).json({ message: "Tienda eliminada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};
