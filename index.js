const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json())

// App routes
app.use('/api/empleados', require('./src/routes/empleadosRoutes'))
app.use('/api/departamentos', require('./src/routes/departamentosRoutes'))
app.use('/api/puestos', require('./src/routes/puestosRoutes'))
app.use('/api/categorias', require('./src/routes/categoriasRoutes'))
app.use('/api/bodegas', require('./src/routes/bodegasRoutes'))
app.use('/api/tipoProductos', require('./src/routes/tipoProductosRoutes'))
app.use('/api/tipoMovimientos', require('./src/routes/tipoMovimientosRoutes'))
app.use('/api/proveedores', require('./src/routes/proveedorRoutes'))
app.use('/api/clientes', require('./src/routes/clientesRoutes'))
app.use('/api/productos', require('./src/routes/productosRoutes'))
app.use('/api/requisicionMateriales', require('./src/routes/requisicionMaterialesRoutes'))
app.use('/api/auth', require('./src/routes/authRoutes'))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})
