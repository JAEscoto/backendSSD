const sql = require('mssql')
const getConnection = require('../config/db')
const { validationResult } = require('express-validator')
const {
  queryGetRequisiciones,
  queryGetRequisicionById,
  queryGetRequisicionByNumeroSolicitud,
  queryCreateRequisicion,
  queryUpdateEstadoRequisicion
} = require('../scripts/requisicionMateriales')
const {
  queryCreateDetalleRequisicionMateriales
} = require('../scripts/detalleRequisicionMateriales')
const {
  queryGetProductoById
} = require('../scripts/productos')

exports.getRequisiciones = async (req, res) => {
  try {
    const pool = await getConnection()
    const requisiciones = await pool.request().query(queryGetRequisiciones)
    res.status(200).json(requisiciones.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getRequisicionById = async (req, res) => {
  try {
    const { id } = req.params

    const pool = await getConnection()
    const requisicion = await pool.request()
      .input('id', sql.Int, id)
      .query(queryGetRequisicionById)

    res.status(200).json(requisicion.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.getRequisicionByNumeroSolicitud = async (req, res) => {
  try {
    const { numeroSolicitud } = req.params

    const pool = await getConnection()
    const requisicion = await pool.request()
      .input('numeroSolicitud', sql.VarChar, numeroSolicitud)
      .query(queryGetRequisicionByNumeroSolicitud)

    res.status(200).json(requisicion.recordset)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.createRequisicion = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    // Crear requisicionMateriales
    const {
      idEmpleado,
      idBodega,
      usuarioCreo
    } = req.body.requisicionMateriales
    const pool = await getConnection()
    const requisicionCreada = await pool.request()
      .input('idEmpleado', sql.Int, idEmpleado)
      .input('idBodega', sql.Int, idBodega)
      .input('idEstadoSolicitud', sql.Int, 1)
      .input('usuarioCreo', sql.VarChar, usuarioCreo)
      .query(queryCreateRequisicion)

    const { insertedId } = requisicionCreada.recordset[0]

    // Recorrer arreglo de productos agregados a la requisicion
    for (const producto of req.body.productosRequisicionMateriales) {
      const productoBd = await pool.request()
        .input('id', sql.Int, producto.idProducto)
        .query(queryGetProductoById)

      const { id, precio } = productoBd.recordset[0]

      await pool.request()
        .input('idRequisicionMateriales', sql.Int, insertedId)
        .input('idProducto', sql.Int, id)
        .input('precioUnitario', sql.Decimal(18, 2), precio)
        .input('cantidad', sql.Decimal(18, 2), producto.cantidad)
        .input('total', sql.Decimal(18, 2), (parseFloat(precio) * producto.cantidad))
        .query(queryCreateDetalleRequisicionMateriales)
    }

    res.status(200).json({ message: 'Requisicion creada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

exports.updateEstadoRequisicion = async (req, res) => {
  try {
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
      return res.status(400).json({ errors: errores.array() })
    }

    const { id } = req.params
    const {
      idEstadoSolicitud,
      usuarioActualizo
    } = req.body
    const pool = await getConnection()
    await pool.request()
      .input('idEstadoSolicitud', sql.Int, idEstadoSolicitud)
      .input('usuarioActualizo', sql.VarChar, usuarioActualizo)
      .input('id', sql.Int, id)
      .query(queryUpdateEstadoRequisicion)

    res.status(200).json({ message: 'Requisicion actualizada exitosamente' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}
