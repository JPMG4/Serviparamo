const mongoose = require('mongoose');

const tipoMovimientoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    enum: ['Entrada', 'Salida'],
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('TipoMovimiento', tipoMovimientoSchema);
