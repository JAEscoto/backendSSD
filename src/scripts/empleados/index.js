const queryGetEmpleados = 'select * from empleados where estado = 1'
const queryGetEmpleadoByUsername = 'select * from empleados where username = @username and estado = 1'
const queryGetEmpleadoById = 'select * from empleados where id = @id and estado = 1'
const queryCreateEmpleado = `insert into empleados(
    primerNombre, 
    primerApellido,
    codigoEmpleado,
    username,
    password,
    correo,
    cedula,
    direccion,
    telefono,
    edad,
    idRol,
    idPuesto,
    salario,
    usuarioCreo
)

values(
    @primerNombre, 
    @primerApellido,
    @codigoEmpleado,
    @username,
    @password,
    @correo,
    @cedula,
    @direccion,
    @telefono,
    @edad,
    @idRol,
    @idPuesto,
    @salario,
    @usuarioCreo
)`
const queryUpdateEmpleado = `update empleados
set primerNombre = @primerNombre,
    primerApellido = @primerApellido,
    codigoEmpleado = @codigoEmpleado,
    username = @username,
    password = @password,
    correo = @correo,
    cedula = @cedula,
    direccion = @direccion,
    telefono = @telefono,
    edad =@edad,
    idRol = @idRol,
    idPuesto = @idPuesto,
    salario = @salario,
    estado = @estado,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`
const queryDeleteEmpleado = `update empleados 
set estado = 0,
    usuarioActualizo = @usuarioActualizo,
    fechaActualizo = GETDATE()
where id = @id`

module.exports = {
  queryGetEmpleados,
  queryCreateEmpleado,
  queryGetEmpleadoByUsername,
  queryGetEmpleadoById,
  queryUpdateEmpleado,
  queryDeleteEmpleado
}
