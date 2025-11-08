const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursal.controller');

router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.obtenerSucursales);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

module.exports = router;
