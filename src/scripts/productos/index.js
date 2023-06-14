const queryGetProductos = 'select * from productos where estado = 1'
const queryGetProductoById = 'select * from productos where id = @id and estado = 1'
const queryCreateProducto = `insert into productos(
    codigoProducto,
    descripcion,
    precio,
    costo,
    idTipoProducto,
    idCategoria,
    usuarioCreo
)

values(
    @codigoProducto,
    @descripcion,
    @precio,
    @costo,
    @idTipoProducto,
    @idCategoria,
    @usuarioCreo
)`
const queryUpdateProducto = `update productos
set codigoProducto = @codigoProducto,
    descripcion = @descripcion,
    precio = @precio,
    costo = @costo,
    idTipoProducto = @idTipoProducto,
    idCategoria = @idCategoria,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteProducto = `update productos
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetProductos,
  queryGetProductoById,
  queryCreateProducto,
  queryUpdateProducto,
  queryDeleteProducto
}
