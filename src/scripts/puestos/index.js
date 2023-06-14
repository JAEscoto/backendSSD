const queryGetAllPuestos = 'select * from puestos where estado = 1'
const queryGetPuestoById = 'select * from puestos where id = @id and estado = 1'
const queryCreatePuesto = `insert into puestos(
    nombre,
    idDepartamento,
    usuarioCreo
)

values(
    @nombre,
    @idDepartamento,
    @usuarioCreo
)`
const queryUpdatePuesto = `update puestos
set nombre = @nombre,
    idDepartamento = @idDepartamento,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeletePuesto = `update puestos
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetAllPuestos,
  queryGetPuestoById,
  queryCreatePuesto,
  queryUpdatePuesto,
  queryDeletePuesto
}
