const mongoose = require('mongoose');

const terceroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  identificacion: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido'],
  },
  sucursal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sucursal',
    required: true,
  },
  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tercero', terceroSchema);
