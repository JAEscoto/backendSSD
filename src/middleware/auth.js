const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!'
    });
  }

  const token = authHeader.split(' ')[1]

  try {
    const usuario = jwt.verify(token, 'SECRET');
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!'
    });
  }
}
