const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  clave: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido'],
  },
  cargo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cargo',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Usuario', usuarioSchema);
