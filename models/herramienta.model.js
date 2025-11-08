const mongoose = require('mongoose');

const herramientaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  item: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tercero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tercero',
    default: null,
  },
  estado: {
    type: String,
    enum: ['Bueno', 'Regular', 'Malo', 'Dado de Baja', 'Vendido'],
    default: 'Bueno',
  },
  codigo: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Herramienta', herramientaSchema);
