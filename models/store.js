const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  nombreNegocio: String,
  direccion: String,
  zona: String,
  telefono: String,
  horarioAtencion: String,
  bags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bag" }],
});

module.exports = mongoose.model("Store", storeSchema);
