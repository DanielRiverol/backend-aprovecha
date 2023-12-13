const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
  descripcion: String,
  precio: Number,
  categoria: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
});

module.exports = mongoose.model('Bag', bagSchema);
