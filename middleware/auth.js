const jwt = require('jsonwebtoken');

// Verifica si existe un encabezado de autorización en la solicitud
module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(); // pasa al siguiente middleware
  }

  const [type, token] = authorization.split(' ');
  console.log("identif token", token);

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  // Verifica la validez del token
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log("identif decodedToken", decodedToken);
    if (err) {
      return next(403);
    }
    // TODO: Verify user identity using `decodeToken.uid`
    // UID es un identificador único asignado a cada usuario en el sistema, puedes definirlo como quieras en tu sistema de autenticación
    req.user = decodedToken;
    req.userId = decodedToken._id;
    next();
  });
};

module.exports.isAuthenticated = (req) => { 
  // TODO: Decide based on the request information whether the user is authenticated
  return req.userId ? true : false;
};

module.exports.isAdmin = (req) => {

  return req.user && req.user.role === 'admin';
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
