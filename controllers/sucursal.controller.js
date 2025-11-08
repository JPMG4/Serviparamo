const Sucursal = require('../models/sucursal.model');
const Tercero = require('../models/tercero.model');
const Herramienta = require('../models/herramienta.model');

// Crear sucursal
exports.crearSucursal = async (req, res) => {
  try {
    const nuevaSucursal = new Sucursal(req.body);
    const sucursalGuardada = await nuevaSucursal.save();
    res.status(201).json({
      mensaje: 'Sucursal creada exitosamente',
      data: sucursalGuardada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear la sucursal',
      error: error.message,
    });
  }
};

// Obtener todas las sucursales
exports.obtenerSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    if (sucursales.length === 0) {
      return res.status(200).json({
        mensaje: 'No hay sucursales registradas',
        data: [],
      });
    }
    res.status(200).json({
      mensaje: 'Listado de sucursales',
      data: sucursales,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las sucursales',
      error: error.message,
    });
  }
};

// Actualizar sucursal
exports.actualizarSucursal = async (req, res) => {
  try {
    const { id } = req.params;
    const sucursal = await Sucursal.findById(id);
    if (!sucursal) {
      return res.status(404).json({
        mensaje: 'Sucursal no encontrada',
      });
    }

    Object.assign(sucursal, req.body);
    const actualizada = await sucursal.save();
    res.status(200).json({
      mensaje: 'Sucursal actualizada correctamente',
      data: actualizada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar la sucursal',
      error: error.message,
    });
  }
};

// Eliminar sucursal con validación cruzada
exports.eliminarSucursal = async (req, res) => {
  try {
    const { id } = req.params;

    const terceros = await Tercero.find({ sucursal: id });
    const herramientas = await Herramienta.find({ tercero: { $in: terceros.map(t => t._id) } });

    if (terceros.length > 0 && herramientas.length > 0) {
      return res.status(403).json({
        mensaje: 'No se puede eliminar la sucursal: hay terceros asociados con herramientas registradas',
      });
    }

    const eliminada = await Sucursal.findByIdAndDelete(id);
    if (!eliminada) {
      return res.status(404).json({
        mensaje: 'Sucursal no encontrada',
      });
    }

    res.status(200).json({
      mensaje: 'Sucursal eliminada correctamente',
      data: eliminada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar la sucursal',
      error: error.message,
    });
  }
};
