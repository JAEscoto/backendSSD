const express = require('express')
const router = express.Router()
const departamentosController = require('../controllers/departamentosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  departamentosController.getDepartamentos(req, res)
})

router.get('/:id', function (req, res) {
  departamentosController.getDepartamentoById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre departamento es obligatorio').not().isEmpty()
], function (req, res) {
  departamentosController.createDepartamento(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre departamento es obligatorio').not().isEmpty()
], function (req, res) {
  departamentosController.updateDepartamento(req, res)
})

router.delete('/:id', function (req, res) {
  departamentosController.deleteDepartamento(req, res)
})

module.exports = router
