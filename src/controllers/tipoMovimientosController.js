const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetTipoMovimientos,
  queryGetTipoMovimientoById,
  queryCreateTipoMovimiento,
  queryUpdateTipoMovimiento,
  queryDeleteTipoMovimiento
} = require('../scripts/tipoMovimientos')

exports.getTipoMovimientos = async (req, res) => {
  try {
    const pool = await getConnection()
    const tipoMovimientos = await pool.request().query(queryGetTipoMovimientos)
    res.status(200).json(tipoMovimientos.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getTipoMovimientoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const tipoMovimiento = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetTipoMovimientoById)
    res.status(200).json(tipoMovimiento.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createTipoMovimiento = async (req, res) => {
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
      .query(queryCreateTipoMovimiento)

    res.status(200).json({ message: 'Tipo movimiento creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateTipoMovimiento = async (req, res) => {
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
      .query(queryUpdateTipoMovimiento)

    res.status(200).json({ id, nombre, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteTipoMovimiento = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteTipoMovimiento)

    res.status(200).json({ message: 'Tipo movimiento eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
