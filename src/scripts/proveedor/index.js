const queryGetProveedores = 'select * from proveedor where estado = 1'
const queryGetProveedorById = 'select * from proveedor where id = @id and estado = 1'
const queryCreateProveedor = `insert into proveedor(
    nombre,
    rtn,
    direccion,
    telefono,
    correo,
    usuarioCreo
)

values(
    @nombre,
    @rtn,
    @direccion,
    @telefono,
    @correo,
    @usuarioCreo
)`
const queryUpdateProveedor = `update proveedor
set nombre = @nombre,
    rtn = @rtn,
    direccion = @direccion,
    telefono = @telefono,
    correo = @correo,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteProveedor = `update proveedor
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetProveedores,
  queryGetProveedorById,
  queryCreateProveedor,
  queryUpdateProveedor,
  queryDeleteProveedor
}
