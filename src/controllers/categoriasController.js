const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetCategorias,
  queryGetCategoriaById,
  queryCreateCategoria,
  queryUpdateCategoria,
  queryDeleteCategoria
} = require('../scripts/categorias')

exports.getCategorias = async (req, res) => {
  try {
    const pool = await getConnection()
    const categorias = await pool.request().query(queryGetCategorias)
    res.status(200).json(categorias.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const categoria = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetCategoriaById)
    res.status(200).json(categoria.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createCategoria = async (req, res) => {
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
      .query(queryCreateCategoria)

    res.status(200).json({ message: 'Categoria creada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateCategoria = async (req, res) => {
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
      .query(queryUpdateCategoria)

    res.status(200).json({ id, nombre, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteCategoria)

    res.status(200).json({ message: 'Categoria eliminada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
