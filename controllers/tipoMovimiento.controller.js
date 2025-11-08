const TipoMovimiento = require('../models/tipoMovimiento.model');

// Crear tipo de movimiento
exports.crearTipoMovimiento = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;

    const nuevo = new TipoMovimiento({ nombre, tipo });
    await nuevo.save();

    res.status(201).json({
      mensaje: 'Tipo de movimiento creado exitosamente',
      data: nuevo,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tipo de movimiento', error: error.message });
  }
};

// Obtener todos los tipos de movimiento
exports.obtenerTiposMovimiento = async (req, res) => {
  try {
    const tipos = await TipoMovimiento.find();
    res.status(200).json({
      mensaje: 'Listado de tipos de movimiento',
      data: tipos,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tipos de movimiento', error: error.message });
  }
};

// Obtener tipo de movimiento por ID
exports.obtenerTipoMovimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoMovimiento.findById(id);
    if (!tipo) {
      return res.status(404).json({ mensaje: 'Tipo de movimiento no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Tipo de movimiento encontrado',
      data: tipo,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar tipo de movimiento', error: error.message });
  }
};

// Actualizar tipo de movimiento
exports.actualizarTipoMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    const movimiento = await TipoMovimiento.findById(id);
    if (!movimiento) {
      return res.status(404).json({ mensaje: 'Tipo de movimiento no encontrado' });
    }

    movimiento.nombre = nombre || movimiento.nombre;
    movimiento.tipo = tipo || movimiento.tipo;

    await movimiento.save();

    res.status(200).json({
      mensaje: 'Tipo de movimiento actualizado correctamente',
      data: movimiento,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tipo de movimiento', error: error.message });
  }
};

// Eliminar tipo de movimiento
exports.eliminarTipoMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await TipoMovimiento.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Tipo de movimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tipo de movimiento', error: error.message });
  }
};
