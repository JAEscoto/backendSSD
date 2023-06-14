const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetBodegas,
  queryGetBodegaById,
  queryCreateBodega,
  queryUpdateBodega,
  queryDeleteBodega
} = require('../scripts/bodegas')

exports.getBodegas = async (req, res) => {
  try {
    const pool = await getConnection()
    const bodegas = await pool.request().query(queryGetBodegas)
    res.status(200).json(bodegas.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getBodegaById = async (req, res) => {
  try {
    const { id } = req.params

    const pool = await getConnection()
    const bodega = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetBodegaById)

    res.status(200).json(bodega.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createBodega = async (req, res) => {
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
      .query(queryCreateBodega)

    res.status(200).json({ message: 'Bodega creada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateBodega = async (req, res) => {
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
      .query(queryUpdateBodega)

    res.status(200).json({ id, nombre, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteBodega = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteBodega)

    res.status(200).json({ message: 'Bodega eliminada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
