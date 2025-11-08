const mongoose = require('mongoose');

const sucursalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Sucursal', sucursalSchema);
