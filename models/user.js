const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["comerciante", "cliente"] ,default:"comerciante"},
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
});

module.exports = mongoose.model("User", userSchema);
