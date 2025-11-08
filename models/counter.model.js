const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  secuencia: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
