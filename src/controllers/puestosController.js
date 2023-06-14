const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetAllPuestos,
  queryGetPuestoById,
  queryCreatePuesto,
  queryUpdatePuesto,
  queryDeletePuesto
} = require('../scripts/puestos')

exports.getPuestos = async (req, res) => {
  try {
    const pool = await getConnection()
    const puestos = await pool.request().query(queryGetAllPuestos)
    res.status(200).json(puestos.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getPuestoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const puesto = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetPuestoById)
    res.status(200).json(puesto.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createPuesto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const {
      nombre,
      idDepartamento,
      usuarioCreo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('idDepartamento', sql.Int, idDepartamento)
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreatePuesto)

    res.status(200).json({ message: 'Puesto creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updatePuesto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      nombre,
      idDepartamento,
      estado,
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('idDepartamento', sql.Int, idDepartamento)
      .input('estado', sql.Bit, estado)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdatePuesto)

    res.status(200).json({ id, nombre, idDepartamento, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deletePuesto = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeletePuesto)

    res.status(200).json({ message: 'Puesto eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
