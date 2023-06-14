const queryGetRequisiciones = 'select * from requisicionMateriales'
const queryGetRequisicionById = 'select * from requisicionMateriales where id = @id'
const queryGetRequisicionByNumeroSolicitud = 'select * from requisicionMateriales where numeroSolicitud = @numeroSolicitud'
const queryCreateRequisicion = `insert into requisicionMateriales(
    idEmpleado,
    idBodega,
    numeroSolicitud,
    idEstadoSolicitud,
    usuarioCreo
)

values(
    @idEmpleado,
    @idBodega,
    'REQ' + RIGHT('000'+ISNULL(CAST(IDENT_CURRENT('requisicionMateriales') AS VARCHAR(4)), 1),4),
    @idEstadoSolicitud,
    @usuarioCreo
);

SELECT SCOPE_IDENTITY() as insertedId;`
const queryUpdateEstadoRequisicion = `update requisicionMateriales
set idEstadoSolicitud = @idEstadoSolicitud,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetRequisiciones,
  queryGetRequisicionById,
  queryGetRequisicionByNumeroSolicitud,
  queryCreateRequisicion,
  queryUpdateEstadoRequisicion
}
