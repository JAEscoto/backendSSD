const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetDepartamentos,
  queryGetDepartamentoById,
  queryCreateDepartamento,
  queryUpdateDepartamento,
  queryDeleteDepartamento
} = require('../scripts/departamentos')

exports.getDepartamentos = async (req, res) => {
  try {
    const pool = await getConnection()
    const departamentos = await pool.request().query(queryGetDepartamentos)
    res.status(200).json(departamentos.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getDepartamentoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const departamento = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetDepartamentoById)
    res.status(200).json(departamento.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createDepartamento = async (req, res) => {
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
      .query(queryCreateDepartamento)

    res.status(200).json({ message: 'Departamento creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateDepartamento = async (req, res) => {
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
      .query(queryUpdateDepartamento)

    res.status(200).json({ id, nombre, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteDepartamento = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteDepartamento)

    res.status(200).json({ message: 'Departamento eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
