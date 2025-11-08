const Usuario = require('../models/usuario.model');
const Movimiento = require('../models/movimiento.model'); // para verificar actividad
const bcrypt = require('bcrypt');

// Crear usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { login, nombre, clave, correo, cargo } = req.body;

    const existe = await Usuario.findOne({ login });
    if (existe) {
      return res.status(400).json({ mensaje: 'El login ya está registrado' });
    }

    const hash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      login,
      nombre,
      clave: hash,
      correo,
      cargo,  
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      data: {
        _id: nuevoUsuario._id,
        login: nuevoUsuario.login,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        cargo: nuevoUsuario.cargo,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('cargo');
    res.status(200).json({
      mensaje: 'Listado de usuarios',
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

// Eliminar usuario (solo si no tiene movimientos)
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const tieneMovimientos = await Movimiento.findOne({ usuario: id });
    if (tieneMovimientos) {
      return res.status(403).json({
        mensaje: 'No se puede eliminar el usuario: tiene movimientos registrados',
      });
    }

    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};

// Actualziar usuario

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, cargo, clave } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;
    usuario.cargo = cargo || usuario.cargo;

    if (clave) {
      usuario.clave = await bcrypt.hash(clave, 10);
    }

    await usuario.save();

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      data: {
        _id: usuario._id,
        login: usuario.login,
        nombre: usuario.nombre,
        correo: usuario.correo,
        cargo: usuario.cargo,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};
