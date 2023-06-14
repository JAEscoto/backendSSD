const express = require('express')
const router = express.Router()
const categoriasController = require('../controllers/categoriasController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  categoriasController.getCategorias(req, res)
})

router.get('/:id', function (req, res) {
  categoriasController.getCategoriaById(req, res)
})

router.post('/', [
  check('nombre', 'Nombre categoria es obligatorio').not().isEmpty()
], function (req, res) {
  categoriasController.createCategoria(req, res)
})

router.put('/:id', [
  check('nombre', 'Nombre categoria es obligatorio').not().isEmpty()
], function (req, res) {
  categoriasController.updateCategoria(req, res)
})

router.delete('/:id', function (req, res) {
  categoriasController.deleteCategoria(req, res)
})

module.exports = router
