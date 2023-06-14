const queryGetBodegas = 'select * from bodegas where estado = 1'
const queryGetBodegaById = 'select * from bodegas where id = @id and estado = 1'
const queryCreateBodega = `insert into bodegas(
    nombre,
    usuarioCreo
)

values(
    @nombre,
    @usuarioCreo
)`
const queryUpdateBodega = `update bodegas
set nombre = @nombre,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteBodega = `update bodegas
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetBodegas,
  queryGetBodegaById,
  queryCreateBodega,
  queryUpdateBodega,
  queryDeleteBodega
}
