const queryGetCategorias = 'select * from categorias where estado = 1'
const queryGetCategoriaById = 'select * from categorias where id = @id and estado = 1'
const queryCreateCategoria = `insert into categorias(
    nombre,
    usuarioCreo
)

values(
    @nombre,
    @usuarioCreo
)`
const queryUpdateCategoria = `update categorias
set nombre = @nombre,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteCategoria = `update categorias
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetCategorias,
  queryGetCategoriaById,
  queryCreateCategoria,
  queryUpdateCategoria,
  queryDeleteCategoria
}
