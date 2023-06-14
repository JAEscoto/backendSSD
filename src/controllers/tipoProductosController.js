const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetTipoProductos,
  queryGetTipoProductoById,
  queryCreateTipoProducto,
  queryUpdateTipoProducto,
  queryDeleteTipoProducto
} = require('../scripts/tipoProductos')

exports.getTipoProductos = async (req, res) => {
  try {
    const pool = await getConnection()
    const tipoProductos = await pool.request().query(queryGetTipoProductos)
    res.status(200).json(tipoProductos.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getTipoProductoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const tipoProducto = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetTipoProductoById)
    res.status(200).json(tipoProducto.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createTipoProducto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const {
      nombre,
      usuarioCreo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreateTipoProducto)

    res.status(200).json({ message: 'Tipo producto creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateTipoProducto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      nombre,
      estado,
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('estado', sql.Bit, estado)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdateTipoProducto)

    res.status(200).json({ id, nombre, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteTipoProducto = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteTipoProducto)

    res.status(200).json({ message: 'Tipo producto eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
