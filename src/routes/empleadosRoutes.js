const express = require('express')
const router = express.Router()
const empleadosController = require('../controllers/empleadosController')
const { check } = require('express-validator')

router.get('/', function (req, res) {
  empleadosController.getEmpleados(req, res)
})

router.get('/:id', function (req, res) {
  empleadosController.getEmpleadoById(req, res)
})

router.post('/', [
  check('primerNombre', 'Primer Nombre es obligatorio').not().isEmpty(),
  check('primerApellido', 'Primer Apellido es obligatorio').not().isEmpty(),
  check('codigoEmpleado', 'Codigo Empleado es obligatorio').not().isEmpty(),
  check('username', 'Username es obligatorio').not().isEmpty(),
  check('password', 'Password debe contener al menos 6 caracteres').isLength({ min: 6 }),
  check('correo', 'Correo debe ser válido').isEmail(),
  check('cedula', 'Ingrese un numero de identidad válido').isLength({ min: 13, max: 13 }),
  check('direccion', 'Direccion es obligatoria').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('edad', 'Edad es obligatoria').not().isEmpty(),
  check('idRol', 'Rol es obligatorio').not().isEmpty(),
  check('idPuesto', 'Puesto es obligatorio').not().isEmpty(),
  check('salario', 'Salario es obligatorio').not().isEmpty()
], function (req, res) {
  empleadosController.createEmpleado(req, res)
})

router.put('/:id', [
  check('primerNombre', 'Primer Nombre es obligatorio').not().isEmpty(),
  check('primerApellido', 'Primer Apellido es obligatorio').not().isEmpty(),
  check('codigoEmpleado', 'Codigo Empleado es obligatorio').not().isEmpty(),
  check('username', 'Username es obligatorio').not().isEmpty(),
  check('password', 'Password debe contener al menos 6 caracteres').isLength({ min: 6 }),
  check('correo', 'Correo debe ser válido').isEmail(),
  check('cedula', 'Ingrese un numero de identidad válido').isLength({ min: 13, max: 13 }),
  check('direccion', 'Direccion es obligatoria').not().isEmpty(),
  check('telefono', 'Ingrese un numero de telefono válido').isLength({ min: 8, max: 8 }),
  check('edad', 'Edad es obligatoria').not().isEmpty(),
  check('idRol', 'Rol es obligatorio').not().isEmpty(),
  check('idPuesto', 'Puesto es obligatorio').not().isEmpty(),
  check('salario', 'Salario es obligatorio').not().isEmpty()
], function (req, res) {
  empleadosController.updateEmpleado(req, res)
})

router.delete('/:id', function (req, res) {
  empleadosController.deleteEmpleado(req, res)
})

module.exports = router
