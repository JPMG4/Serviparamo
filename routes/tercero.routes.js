const express = require('express');
const router = express.Router();
const terceroController = require('../controllers/tercero.controller');

router.post('/', terceroController.crearTercero);
router.get('/', terceroController.obtenerTerceros);
router.get('/:id', terceroController.obtenerTerceroPorId);
router.put('/:id', terceroController.actualizarTercero);
router.delete('/:id', terceroController.eliminarTercero);

module.exports = router;
