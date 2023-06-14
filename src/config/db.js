const sql = require('mssql/msnodesqlv8')
const config = {
  driver: 'msnodesqlv8',
  server: 'JUANE\\SQLEXPRESS01',
  database: 'ProyectoSD',
  options: {
    trustedConnection: true
  }
}

const getConnection = async () => {
  try {
    const pool = await sql.connect(config)
    return pool
  } catch (error) {
    console.log(error)
  }
}

module.exports = getConnection
