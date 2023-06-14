const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetClientes,
  queryGetClienteById,
  queryCreateCliente,
  queryUpdateCliente,
  queryDeleteCliente
} = require('../scripts/clientes')

exports.getClientes = async (req, res) => {
  try {
    const pool = await getConnection()
    const clientes = await pool.request().query(queryGetClientes)
    res.status(200).json(clientes.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const cliente = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetClienteById)
    res.status(200).json(cliente.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createCliente = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const {
      nombre,
      rtn,
      direccion,
      telefono,
      correo,
      usuarioCreo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('rtn', sql.VarChar, rtn)
      .input('direccion', sql.VarChar, direccion)
      .input('telefono', sql.VarChar, telefono)
      .input('correo', sql.VarChar, correo)
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreateCliente)

    res.status(200).json({ message: 'Cliente creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateCliente = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      nombre,
      rtn,
      direccion,
      telefono,
      correo,
      estado,
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('rtn', sql.VarChar, rtn)
      .input('direccion', sql.VarChar, direccion)
      .input('telefono', sql.VarChar, telefono)
      .input('correo', sql.VarChar, correo)
      .input('estado', sql.Bit, estado)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdateCliente)

    res.status(200).json({ id, nombre, rtn, direccion, telefono, correo, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteCliente)

    res.status(200).json({ message: 'Cliente eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
