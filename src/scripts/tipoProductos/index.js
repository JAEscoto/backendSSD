const queryGetTipoProductos = 'select * from tipoProducto where estado = 1'
const queryGetTipoProductoById = 'select * from tipoProducto where id = @id and estado = 1'
const queryCreateTipoProducto = `insert into tipoProducto(
    nombre,
    usuarioCreo
)

values(
    @nombre,
    @usuarioCreo
)`
const queryUpdateTipoProducto = `update tipoProducto
set nombre = @nombre,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteTipoProducto = `update tipoProducto
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetTipoProductos,
  queryGetTipoProductoById,
  queryCreateTipoProducto,
  queryUpdateTipoProducto,
  queryDeleteTipoProducto
}
