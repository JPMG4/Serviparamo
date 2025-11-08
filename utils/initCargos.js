const Cargo = require('../models/cargo.model');

const cargosIniciales = ['Técnico', 'Almacenista', 'Administrador'];

async function inicializarCargos() {
  try {
    for (const nombre of cargosIniciales) {
      const existe = await Cargo.findOne({ nombre });
      if (!existe) {
        await new Cargo({ nombre }).save();
        console.log(`✅ Cargo "${nombre}" creado`);
      }
    }
  } catch (error) {
    console.error('❌ Error al inicializar cargos:', error.message);
  }
}

module.exports = inicializarCargos;
