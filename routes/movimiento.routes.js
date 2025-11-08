const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');

router.post('/', movimientoController.crearMovimiento);
router.get('/', movimientoController.obtenerMovimientos);
router.get('/:id', movimientoController.obtenerMovimientoPorId);

module.exports = router;
