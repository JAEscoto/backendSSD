const queryCreateDetalleRequisicionMateriales = `insert into detalleRequisicionMateriales(
    idRequisicionMateriales,
    idProducto,
    precioUnitario,
    cantidad,
    total
)

values(
    @idRequisicionMateriales,
    @idProducto,
    @precioUnitario,
    @cantidad,
    @total
)`

module.exports = {
  queryCreateDetalleRequisicionMateriales
}
