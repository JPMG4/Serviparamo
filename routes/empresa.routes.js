const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

// Solo una empresa permitida
router.post('/', empresaController.crearEmpresa);
router.get('/', empresaController.obtenerEmpresa);
router.put('/', empresaController.actualizarEmpresa);
router.delete('/', empresaController.eliminarEmpresa); // Bloqueado

module.exports = router;
