const Bag = require("../models/bag");

const getAllBags = async (req, res) => {
  try {
    const bags = await Bag.find();
    res.status(200).json(bags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const getBagById = async (req, res) => {
  try {
    const bagId = req.params.bagId;
    const bag = await Bag.findById(bagId);
    if (!bag) {
      return res.status(404).json({ error: "Bolsa no encontrada." });
    }
    res.status(200).json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const createBag = async (req, res) => {
  try {
    const { descripcion, precio, categoria, storeId } = req.body;

    // Crear una nueva bolsa asociada a una tienda
    const newBag = new Bag({ descripcion, precio, categoria, store: storeId });
    await newBag.save();

    res.status(201).json({ message: "Bolsa creada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateBag = async (req, res) => {
  try {
    const bagId = req.params.bagId;
    const { descripcion, precio, categoria } = req.body;

    // Buscar la bolsa por ID
    const bag = await Bag.findById(bagId);
    if (!bag) {
      return res.status(404).json({ error: "Bolsa no encontrada." });
    }

    // Actualizar la información de la bolsa
    bag.descripcion = descripcion;
    bag.precio = precio;
    bag.categoria = categoria;

    await bag.save();

    res.status(200).json({ message: "Bolsa actualizada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const deleteBag = async (req, res) => {
  try {
    const bagId = req.params.bagId;

    // Eliminar la bolsa por ID
    await Bag.findByIdAndDelete(bagId);

    res.status(200).json({ message: "Bolsa eliminada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getAllBags,
  getBagById,
  createBag,
  updateBag,
  deleteBag,
};
