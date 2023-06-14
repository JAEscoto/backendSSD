const express = require('express')
const router = express.Router()
const clientesController = require('../controllers/clientesController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  clientesController.getClientes(req, res)
})

router.get('/:id', function (req, res) {
  clientesController.getClienteById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre proveedor es obligatorio').not().isEmpty(),
  check('rtn', 'Ingrese un RTN valido').isLength({ min: 14, max: 14 }),
  check('direccion', 'Direccion proveedor es obligatorio').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('correo', 'Correo debe ser válido').isEmail()
], function (req, res) {
  clientesController.createCliente(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre proveedor es obligatorio').not().isEmpty(),
  check('rtn', 'Ingrese un RTN valido').isLength({ min: 14, max: 14 }),
  check('direccion', 'Direccion proveedor es obligatorio').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('correo', 'Correo debe ser válido').isEmail()
], function (req, res) {
  clientesController.updateCliente(req, res)
})

router.delete('/:id', function (req, res) {
  clientesController.deleteCliente(req, res)
})

module.exports = router
