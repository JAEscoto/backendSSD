const queryGetDepartamentos = 'select * from departamentos where estado = 1'
const queryGetDepartamentoById = 'select * from departamentos where id = @id and estado = 1'
const queryCreateDepartamento = `insert into departamentos(
    nombre,
    usuarioCreo
)

values(
    @nombre,
    @usuarioCreo
)`
const queryUpdateDepartamento = `update departamentos
set nombre = @nombre,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteDepartamento = `update departamentos
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetDepartamentos,
  queryGetDepartamentoById,
  queryCreateDepartamento,
  queryUpdateDepartamento,
  queryDeleteDepartamento
}
