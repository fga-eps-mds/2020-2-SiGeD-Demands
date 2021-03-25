const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];

  console.log(token);
  console.log(process.env.SECRET);

  if (!token) {
    return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
  }

  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Não foi possível autenticar o token.' });
    }
    req.userId = decoded.id;
    next();
    return undefined;
  });
}

module.exports = { verifyJWT };
