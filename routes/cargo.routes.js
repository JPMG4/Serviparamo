const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargo.controller');

router.get('/', cargoController.obtenerCargos);
router.get('/:id', cargoController.obtenerCargoPorId);
router.post('/', cargoController.bloqueado);
router.put('/:id', cargoController.bloqueado);
router.delete('/:id', cargoController.bloqueado);

module.exports = router;
