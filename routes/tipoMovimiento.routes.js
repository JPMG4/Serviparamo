const express = require('express');
const router = express.Router();
const tipoMovimientoController = require('../controllers/tipoMovimiento.controller');

router.post('/', tipoMovimientoController.crearTipoMovimiento);
router.get('/', tipoMovimientoController.obtenerTiposMovimiento);
router.get('/:id', tipoMovimientoController.obtenerTipoMovimientoPorId);
router.put('/:id', tipoMovimientoController.actualizarTipoMovimiento);
router.delete('/:id', tipoMovimientoController.eliminarTipoMovimiento);

module.exports = router;
