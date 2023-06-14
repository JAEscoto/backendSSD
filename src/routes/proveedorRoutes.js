const express = require('express')
const router = express.Router()
const proveedorController = require('../controllers/proveedorController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  proveedorController.getProveedores(req, res)
})

router.get('/:id', function (req, res) {
  proveedorController.getProveedorById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre proveedor es obligatorio').not().isEmpty(),
  check('rtn', 'Ingrese un RTN valido').isLength({ min: 14, max: 14 }),
  check('direccion', 'Direccion proveedor es obligatorio').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('correo', 'Correo debe ser válido').isEmail()
], function (req, res) {
  proveedorController.createProveedor(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre proveedor es obligatorio').not().isEmpty(),
  check('rtn', 'Ingrese un RTN valido').isLength({ min: 14, max: 14 }),
  check('direccion', 'Direccion proveedor es obligatorio').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('correo', 'Correo debe ser válido').isEmail()
], function (req, res) {
  proveedorController.updateProveedor(req, res)
})

router.delete('/:id', function (req, res) {
  proveedorController.deleteProveedor(req, res)
})

module.exports = router
