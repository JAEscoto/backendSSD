const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetProductos,
  queryGetProductoById,
  queryCreateProducto,
  queryUpdateProducto,
  queryDeleteProducto
} = require('../scripts/productos')

exports.getProductos = async (req, res) => {
  try {
    const pool = await getConnection()
    const productos = await pool.request().query(queryGetProductos)
    res.status(200).json(productos.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params
    const pool = await getConnection()
    const producto = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetProductoById)
    res.status(200).json(producto.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createProducto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const {
      codigoProducto,
      descripcion,
      precio,
      costo,
      idTipoProducto,
      idCategoria,
      usuarioCreo
    } = req.body

    const pool = await getConnection()

    await pool.request().input('codigoProducto', sql.VarChar, codigoProducto)
      .input('descripcion', sql.VarChar, descripcion)
      .input('precio', sql.Decimal(18, 2), parseFloat(precio))
      .input('costo', sql.Decimal(18, 2), parseFloat(costo))
      .input('idTipoProducto', sql.Int, idTipoProducto)
      .input('idCategoria', sql.Int, idCategoria)
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreateProducto)

    res.status(200).json({ message: 'Producto creado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateProducto = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      codigoProducto,
      descripcion,
      precio,
      costo,
      idTipoProducto,
      idCategoria,
      estado,
      usuarioActualizo
    } = req.body

    const pool = await getConnection()

    await pool.request().input('codigoProducto', sql.VarChar, codigoProducto)
      .input('descripcion', sql.VarChar, descripcion)
      .input('precio', sql.Decimal(18, 2), parseFloat(precio))
      .input('costo', sql.Decimal(18, 2), parseFloat(costo))
      .input('idTipoProducto', sql.Int, idTipoProducto)
      .input('idCategoria', sql.Int, idCategoria)
      .input('estado', sql.Bit, estado)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdateProducto)

    res.status(200).json({ id, codigoProducto, descripcion, precio, costo, idTipoProducto, idCategoria, estado, usuarioActualizo })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params
    const {
      usuarioActualizo
    } = req.body

    const pool = await getConnection()
    await pool.request()
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryDeleteProducto)

    res.status(200).json({ message: 'Producto eliminado exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
