const express = require('express')
const router = express.Router()
const tipoProductosController = require('../controllers/tipoProductosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  tipoProductosController.getTipoProductos(req, res)
})

router.get('/:id', function (req, res) {
  tipoProductosController.getTipoProductoById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre tipo producto es obligatorio').not().isEmpty()
], function (req, res) {
  tipoProductosController.createTipoProducto(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre tipo producto es obligatorio').not().isEmpty()
], function (req, res) {
  tipoProductosController.updateTipoProducto(req, res)
})

router.delete('/:id', function (req, res) {
  tipoProductosController.deleteTipoProducto(req, res)
})

module.exports = router
