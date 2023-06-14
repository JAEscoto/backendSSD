const express = require('express')
const router = express.Router()
const productosController = require('../controllers/productosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  productosController.getProductos(req, res)
})

router.get('/:id', function (req, res) {
  productosController.getProductoById(req, res)
})

router.post('/', [
  check('codigoProducto', 'Codigo producto es obligatorio').not().isEmpty(),
  check('descripcion', 'Descripcion es obligatorio').not().isEmpty(),
  check('precio', 'Precio es obligatorio').not().isEmpty(),
  check('costo', 'Costo es obligatorio').not().isEmpty(),
  check('idTipoProducto', 'Tipo producto es obligatorio').not().isEmpty(),
  check('idCategoria', 'Categoria es obligatorio').not().isEmpty()
], function (req, res) {
  productosController.createProducto(req, res)
})

router.put('/:id', [
  check('codigoProducto', 'Codigo producto es obligatorio').not().isEmpty(),
  check('descripcion', 'Descripcion es obligatorio').not().isEmpty(),
  check('precio', 'Precio es obligatorio').not().isEmpty(),
  check('costo', 'Costo es obligatorio').not().isEmpty(),
  check('idTipoProducto', 'Tipo producto es obligatorio').not().isEmpty(),
  check('idCategoria', 'Categoria es obligatorio').not().isEmpty()
], function (req, res) {
  productosController.updateProducto(req, res)
})

router.delete('/:id', function (req, res) {
  productosController.deleteProducto(req, res)
})

module.exports = router
