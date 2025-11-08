const Cargo = require('../models/cargo.model');

// Obtener todos los cargos
exports.obtenerCargos = async (req, res) => {
  try {
    const cargos = await Cargo.find();
    res.status(200).json({
      mensaje: cargos.length === 0 ? 'No hay cargos registrados' : 'Listado de cargos',
      data: cargos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los cargos',
      error: error.message,
    });
  }
};

// Obtener un cargo por ID
exports.obtenerCargoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findById(id);
    if (!cargo) {
      return res.status(404).json({ mensaje: 'Cargo no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Cargo encontrado',
      data: cargo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener el cargo',
      error: error.message,
    });
  }
};

// Bloquear modificaciones
exports.bloqueado = (req, res) => {
  res.status(403).json({
    mensaje: 'Operación no permitida: los cargos son fijos y no se pueden modificar',
  });
};
