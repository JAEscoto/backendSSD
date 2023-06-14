const queryGetTipoMovimientos = 'select * from tipoMovimiento where estado = 1'
const queryGetTipoMovimientoById = 'select * from tipoMovimiento where id = @id and estado = 1'
const queryCreateTipoMovimiento = `insert into tipoMovimiento(
    nombre,
    usuarioCreo
)

values(
    @nombre,
    @usuarioCreo
)`
const queryUpdateTipoMovimiento = `update tipoMovimiento
set nombre = @nombre,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteTipoMovimiento = `update tipoMovimiento
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetTipoMovimientos,
  queryGetTipoMovimientoById,
  queryCreateTipoMovimiento,
  queryUpdateTipoMovimiento,
  queryDeleteTipoMovimiento
}
