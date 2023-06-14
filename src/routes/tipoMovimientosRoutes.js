const express = require('express')
const router = express.Router()
const tipoMovimientosController = require('../controllers/tipoMovimientosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  tipoMovimientosController.getTipoMovimientos(req, res)
})

router.get('/:id', function (req, res) {
  tipoMovimientosController.getTipoMovimientoById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre tipo movimiento es obligatorio').not().isEmpty()
], function (req, res) {
  tipoMovimientosController.createTipoMovimiento(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre tipo movimiento es obligatorio').not().isEmpty()
], function (req, res) {
  tipoMovimientosController.updateTipoMovimiento(req, res)
})

router.delete('/:id', function (req, res) {
  tipoMovimientosController.deleteTipoMovimiento(req, res)
})

module.exports = router
