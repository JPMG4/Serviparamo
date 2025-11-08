const Movimiento = require('../models/movimiento.model');
const Herramienta = require('../models/herramienta.model');
const TipoMovimiento = require('../models/tipoMovimiento.model');
const Counter = require('../models/counter.model');

// Crear movimiento
exports.crearMovimiento = async (req, res) => {
  try {
    const {
      fechaMvto,
      idTipoMvto,
      idTercero,
      idHerramienta,
      idUsuario,
      descripcion
    } = req.body;

    const tipo = await TipoMovimiento.findById(idTipoMvto);
    if (!tipo) return res.status(400).json({ mensaje: 'Tipo de movimiento inválido' });

    const cntEntrada = tipo.tipo === 'Entrada' ? 1 : 0;
    const cntSalida = tipo.tipo === 'Salida' ? 1 : 0;

    const secuencia = await Counter.findOneAndUpdate(
      { nombre: 'movimiento' },
      { $inc: { secuencia: 1 } },
      { new: true, upsert: true }
    );

    const idMvto = secuencia.secuencia;

    const nuevo = new Movimiento({
      idMvto,
      fechaMvto,
      idTipoMvto,
      idTercero,
      idHerramienta,
      idUsuario,
      descripcion,
      cntEntrada,
      cntSalida,
    });

    await nuevo.save();

    const herramienta = await Herramienta.findById(idHerramienta);
    if (!herramienta) return res.status(404).json({ mensaje: 'Herramienta no encontrada' });

    if (cntSalida === 1) {
      herramienta.tercero = idTercero;
    } else if (cntEntrada === 1) {
      herramienta.tercero = null;
    }

    await herramienta.save();

    res.status(201).json({
      mensaje: 'Movimiento registrado exitosamente',
      data: nuevo,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar movimiento', error: error.message });
  }
};

// Obtener todos los movimientos
exports.obtenerMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find()
      .populate('idTipoMvto')
      .populate('idTercero')
      .populate('idHerramienta')
      .populate('idUsuario');

    res.status(200).json({
      mensaje: 'Listado de movimientos',
      data: movimientos,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener movimientos', error: error.message });
  }
};

// Obtener movimiento por ID
exports.obtenerMovimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const movimiento = await Movimiento.findById(id)
      .populate('idTipoMvto')
      .populate('idTercero')
      .populate('idHerramienta')
      .populate('idUsuario');

    if (!movimiento) {
      return res.status(404).json({ mensaje: 'Movimiento no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Movimiento encontrado',
      data: movimiento,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar movimiento', error: error.message });
  }
};
