const express = require('express')
const router = express.Router()
const puestosController = require('../controllers/puestosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  puestosController.getPuestos(req, res)
})

router.get('/:id', function (req, res) {
  puestosController.getPuestoById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre puesto es obligatorio').not().isEmpty(),
  check('idDepartamento', 'Departamento es obligatorio').not().isEmpty()
], function (req, res) {
  puestosController.createPuesto(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre puesto es obligatorio').not().isEmpty(),
  check('idDepartamento', 'Departamento es obligatorio').not().isEmpty()
], function (req, res) {
  puestosController.updatePuesto(req, res)
})

router.delete('/:id', function (req, res) {
  puestosController.deletePuesto(req, res)
})

module.exports = router
