const sql = require('mssql')
const bcrypt = require('bcrypt')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetEmpleados,
  queryCreateEmpleado,
  queryGetEmpleadoByUsername,
  queryGetEmpleadoById,
  queryUpdateEmpleado,
  queryDeleteEmpleado
} = require('../scripts/empleados')

exports.getEmpleados = async (req, res) => {
  try {
    const pool = await getConnection()
    const empleados = await pool.request().query(queryGetEmpleados)
    res.status(200).json(empleados.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getEmpleadoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const empleado = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetEmpleadoById)
    res.status(200).json(empleado.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createEmpleado = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const {
      primerNombre,
      primerApellido,
      codigoEmpleado,
      username,
      password,
      correo,
      cedula,
      direccion,
      telefono,
      edad,
      idRol,
      idPuesto,
      salario,
      usuarioCreo
    } = req.body

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const pool = await getConnection()

    await pool.request().input('primerNombre', sql.VarChar, primerNombre)
      .input('primerApellido', sql.VarChar, primerApellido)
      .input('codigoEmpleado', sql.VarChar, codigoEmpleado)
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .input('correo', sql.VarChar, correo)
      .input('cedula', sql.VarChar, cedula)
      .input('direccion', sql.VarChar, direccion)
      .input('telefono', sql.VarChar, telefono)
      .input('edad', sql.VarChar, edad)
      .input('idRol', sql.Int, parseInt(idRol))
      .input('idPuesto', sql.Int, parseInt(idPuesto))
      .input('salario', sql.Decimal, parseFloat(salario))
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreateEmpleado)

    const createdEmployee = await pool.request().input('username', sql.VarChar, username)
      .query(queryGetEmpleadoByUsername)
    res.status(200).json(createdEmployee.recordset[0])
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateEmpleado = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      primerNombre,
      primerApellido,
      codigoEmpleado,
      username,
      password,
      correo,
      cedula,
      direccion,
      telefono,
      edad,
      idRol,
      idPuesto,
      salario,
      estado,
      usuarioActualizo
    } = req.body

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const pool = await getConnection()

    await pool.request().input('primerNombre', sql.VarChar, primerNombre)
      .input('primerApellido', sql.VarChar, primerApellido)
      .input('codigoEmpleado', sql.VarChar, codigoEmpleado)
      .input('username', sql.VarChar, username)
      .input('password', sql.VarBinary, hashedPassword)
      .input('correo', sql.VarChar, correo)
      .input('cedula', sql.VarChar, cedula)
      .input('direccion', sql.VarChar, direccion)
      .input('telefono', sql.VarChar, telefono)
      .input('edad', sql.VarChar, edad)
      .input('idRol', sql.Int, parseInt(idRol))
      .input('idPuesto', sql.Int, parseInt(idPuesto))
      .input('salario', sql.Decimal, parseFloat(salario))
      .input('estado', sql.Bit, estado)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdateEmpleado)

    res.status(200).json({
      id,
      primerNombre,
      primerApellido,
      codigoEmpleado,
      username,
      password,
      correo,
      cedula,
      direccion,
      telefono,
      edad,
      idRol,
      idPuesto,
      salario,
      estado,
      usuarioActualizo
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body

    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteEmpleado)

    res.status(200).json({ message: 'Empleado eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
