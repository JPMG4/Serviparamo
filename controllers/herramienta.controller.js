const Herramienta = require('../models/herramienta.model');
const Movimiento = require('../models/movimiento.model'); // ← debe existir

// Crear herramienta
exports.crearHerramienta = async (req, res) => {
  try {
    const { nombre, item, estado, codigo } = req.body;

    const existe = await Herramienta.findOne({ item });
    if (existe) {
      return res.status(400).json({ mensaje: 'El item ya está registrado' });
    }

    const nueva = new Herramienta({ nombre, item, estado, codigo });
    await nueva.save();

    res.status(201).json({
      mensaje: 'Herramienta creada exitosamente',
      data: nueva,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear herramienta', error: error.message });
  }
};

// Obtener todas las herramientas
exports.obtenerHerramientas = async (req, res) => {
  try {
    const herramientas = await Herramienta.find().populate('tercero');
    res.status(200).json({
      mensaje: 'Listado de herramientas',
      data: herramientas,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener herramientas', error: error.message });
  }
};

// Obtener herramienta por ID
exports.obtenerHerramientaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const herramienta = await Herramienta.findById(id).populate('tercero');
    if (!herramienta) {
      return res.status(404).json({ mensaje: 'Herramienta no encontrada' });
    }

    res.status(200).json({
      mensaje: 'Herramienta encontrada',
      data: herramienta,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar herramienta', error: error.message });
  }
};

// Actualizar herramienta
exports.actualizarHerramienta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, estado, codigo } = req.body;

    const herramienta = await Herramienta.findById(id);
    if (!herramienta) {
      return res.status(404).json({ mensaje: 'Herramienta no encontrada' });
    }

    herramienta.nombre = nombre || herramienta.nombre;
    herramienta.estado = estado || herramienta.estado;
    herramienta.codigo = codigo || herramienta.codigo;

    await herramienta.save();

    res.status(200).json({
      mensaje: 'Herramienta actualizada correctamente',
      data: herramienta,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar herramienta', error: error.message });
  }
};

// Eliminar herramienta (solo si no está asignada y no tiene movimientos)
exports.eliminarHerramienta = async (req, res) => {
  try {
    const { id } = req.params;

    const herramienta = await Herramienta.findById(id);
    if (!herramienta) {
      return res.status(404).json({ mensaje: 'Herramienta no encontrada' });
    }

    if (herramienta.tercero) {
      return res.status(403).json({ mensaje: 'No se puede eliminar: herramienta asignada a un tercero' });
    }

    const tieneMovimientos = await Movimiento.exists({ herramienta: id });
    if (tieneMovimientos) {
      return res.status(403).json({ mensaje: 'No se puede eliminar: herramienta con movimientos registrados' });
    }

    await Herramienta.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Herramienta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar herramienta', error: error.message });
  }
};
