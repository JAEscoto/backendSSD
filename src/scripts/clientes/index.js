const queryGetClientes = 'select * from clientes where estado = 1'
const queryGetClienteById = 'select * from clientes where id = @id and estado = 1'
const queryCreateCliente = `insert into clientes(
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
const queryUpdateCliente = `update clientes
set nombre = @nombre,
    rtn = @rtn,
    direccion = @direccion,
    telefono = @telefono,
    correo = @correo,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteCliente = `update clientes
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetClientes,
  queryGetClienteById,
  queryCreateCliente,
  queryUpdateCliente,
  queryDeleteCliente
}
