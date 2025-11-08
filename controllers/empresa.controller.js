const Empresa = require('../models/empresa.model');

// Crear empresa (solo si no existe ninguna)
exports.crearEmpresa = async (req, res) => {
  try {
    const existente = await Empresa.findOne();
    if (existente) {
      return res.status(403).json({ mensaje: 'Ya existe una empresa registrada. Solo se permite una.' });
    }

    const nuevaEmpresa = new Empresa(req.body);
    const empresaGuardada = await nuevaEmpresa.save();
    res.status(201).json(empresaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear empresa', error: error.message });
  }
};

// Obtener empresa
exports.obtenerEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findOne();
    if (!empresa) {
      return res.status(404).json({ mensaje: 'No hay empresa registrada' });
    }
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener empresa', error: error.message });
  }
};

// Actualizar empresa
exports.actualizarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findOne();
    if (!empresa) {
      return res.status(404).json({ mensaje: 'No hay empresa registrada para actualizar' });
    }

    Object.assign(empresa, req.body);
    const empresaActualizada = await empresa.save();
    res.json(empresaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar empresa', error: error.message });
  }
};

// Bloquear eliminación
exports.eliminarEmpresa = async (req, res) => {
  res.status(403).json({ mensaje: 'No se permite eliminar la empresa' });
};
