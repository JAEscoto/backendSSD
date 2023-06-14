const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const { queryGetEmpleadoByUsername } = require('../scripts/empleados')

exports.autenticarUsuario = async (req, res, next) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { username, password } = req.body
    const pool = await getConnection()

    const dbResponse = await pool.request()
      .input('username', sql.VarChar, username)
      .query(queryGetEmpleadoByUsername)

    const [usuarioBd] = dbResponse.recordset

    if (!usuarioBd) {
      res.status(401).json({ msg: 'El usuario ingresado no existe' })
      return next()
    }

    if (bcrypt.compareSync(password, usuarioBd.password)) {
      // Crear JWT
      const token = jwt.sign(usuarioBd, 'SECRET', {
        expiresIn: '8h'
      })

      res.json({ token })
    } else {
      res.status(401).json({ msg: 'Password Incorrecto' })
      return next()
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.usuarioAutenticado = (req, res, next) => {
  res.json({ usuario: req.usuario })
}
