const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetProveedores,
  queryGetProveedorById,
  queryCreateProveedor,
  queryUpdateProveedor,
  queryDeleteProveedor
} = require('../scripts/proveedor')

exports.getProveedores = async (req, res) => {
  try {
    const pool = await getConnection()
    const proveedores = await pool.request().query(queryGetProveedores)
    res.status(200).json(proveedores.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getProveedorById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const proveedor = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetProveedorById)
    res.status(200).json(proveedor.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createProveedor = async (req, res) => {
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
      .query(queryCreateProveedor)

    res.status(200).json({ message: 'Proveedor creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateProveedor = async (req, res) => {
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
      .query(queryUpdateProveedor)

    res.status(200).json({ id, nombre, rtn, direccion, telefono, correo, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteProveedor)

    res.status(200).json({ message: 'Proveedor eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
