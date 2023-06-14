const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post('/', [
  check('username', 'Username es obligatorio').not().isEmpty(),
  check('password', 'Password es obligatorio').not().isEmpty()
], function (req, res) {
  authController.autenticarUsuario(req, res)
})

router.get('/',
  auth,
  function (req, res) {
    authController.usuarioAutenticado(req, res)
  }
)

module.exports = router
