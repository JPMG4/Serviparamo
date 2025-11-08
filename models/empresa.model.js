const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nit: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  razonSocial: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  celular: {
    type: String,
    trim: true,
  },
  correo: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Empresa', empresaSchema);
