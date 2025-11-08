const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
  idMvto: {
    type: Number,
    unique: true,
  },
  fechaMvto: {
    type: Date,
    required: true,
  },
  idTipoMvto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoMovimiento',
    required: true,
  },
  idTercero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tercero',
    required: true,
  },
  idHerramienta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Herramienta',
    required: true,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  cntEntrada: {
    type: Number,
    default: 0,
  },
  cntSalida: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movimiento', movimientoSchema);
