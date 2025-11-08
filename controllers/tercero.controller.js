const Tercero = require('../models/tercero.model');

// Crear tercero
exports.crearTercero = async (req, res) => {
  try {
    const { nombre, identificacion, correo, sucursal, estado } = req.body;

    const existe = await Tercero.findOne({ identificacion });
    if (existe) {
      return res.status(400).json({ mensaje: 'La identificación ya está registrada' });
    }

    const nuevoTercero = new Tercero({ nombre, identificacion, correo, sucursal, estado });
    await nuevoTercero.save();

    res.status(201).json({
      mensaje: 'Tercero creado exitosamente',
      data: nuevoTercero,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear tercero', error: error.message });
  }
};

// Obtener todos los terceros
exports.obtenerTerceros = async (req, res) => {
  try {
    const terceros = await Tercero.find().populate('sucursal');
    res.status(200).json({
      mensaje: 'Listado de terceros',
      data: terceros,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener terceros', error: error.message });
  }
};

//Obtener un tercero
exports.obtenerTerceroPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const tercero = await Tercero.findById(id).populate('sucursal');
    if (!tercero) {
      return res.status(404).json({ mensaje: 'Tercero no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Tercero encontrado',
      data: tercero,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar tercero', error: error.message });
  }
};

// Actualizar tercero
exports.actualizarTercero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, sucursal, estado } = req.body;

    const tercero = await Tercero.findById(id);
    if (!tercero) {
      return res.status(404).json({ mensaje: 'Tercero no encontrado' });
    }

    tercero.nombre = nombre || tercero.nombre;
    tercero.correo = correo || tercero.correo;
    tercero.sucursal = sucursal || tercero.sucursal;
    tercero.estado = estado || tercero.estado;

    await tercero.save();

    res.status(200).json({
      mensaje: 'Tercero actualizado correctamente',
      data: tercero,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar tercero', error: error.message });
  }
};

// Eliminar tercero

const Movimiento = require('../models/movimiento.model'); // ← asegúrate de tener este modelo

exports.eliminarTercero = async (req, res) => {
  try {
    const { id } = req.params;

    const tieneMovimientos = await Movimiento.findOne({ tercero: id });
    if (tieneMovimientos) {
      return res.status(403).json({
        mensaje: 'No se puede eliminar el tercero: tiene movimientos registrados',
      });
    }

    await Tercero.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Tercero eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar tercero', error: error.message });
  }
};

