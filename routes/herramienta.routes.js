const express = require('express');
const router = express.Router();
const herramientaController = require('../controllers/herramienta.controller');

router.post('/', herramientaController.crearHerramienta);
router.get('/', herramientaController.obtenerHerramientas);
router.get('/:id', herramientaController.obtenerHerramientaPorId);
router.put('/:id', herramientaController.actualizarHerramienta);
router.delete('/:id', herramientaController.eliminarHerramienta);

module.exports = router;
