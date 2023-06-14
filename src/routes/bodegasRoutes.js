const express = require('express')
const router = express.Router()
const bodegasController = require('../controllers/bodegasController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  bodegasController.getBodegas(req, res)
})

router.get('/:id', function (req, res) {
  bodegasController.getBodegaById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre bodega es obligatorio').not().isEmpty()
], function (req, res) {
  bodegasController.createBodega(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre bodega es obligatorio').not().isEmpty()
], function (req, res) {
  bodegasController.updateBodega(req, res)
})

router.delete('/:id', function (req, res) {
  bodegasController.deleteBodega(req, res)
})

module.exports = router
