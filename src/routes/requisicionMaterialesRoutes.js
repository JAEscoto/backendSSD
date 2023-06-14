const express = require('express')
const router = express.Router()
const requisicionMaterialesController = require('../controllers/requisicionMaterialesController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  requisicionMaterialesController.getRequisiciones(req, res)
})

router.get('/:id', function (req, res) {
  requisicionMaterialesController.getRequisicionById(req, res)
})

router.get('/numeroSolicitud/:numeroSolicitud', function (req, res) {
  requisicionMaterialesController.getRequisicionByNumeroSolicitud(req, res)
})

router.post('/', [
  check('requisicionMateriales.idBodega', 'Bodega es obligatorio').not().isEmpty(),
  check('productosRequisicionMateriales', 'Debe ingresar minimo un producto').isArray({ min: 1 })
], function (req, res) {
  requisicionMaterialesController.createRequisicion(req, res)
})

router.put('/:id', [
  check('idEstadoSolicitud', 'Estado solicitud es obligatorio').not().isEmpty()
], function (req, res) {
  requisicionMaterialesController.updateEstadoRequisicion(req, res)
})

module.exports = router
