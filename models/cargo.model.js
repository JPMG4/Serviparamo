const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    enum: ['Técnico', 'Almacenista', 'Administrador'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cargo', cargoSchema);
