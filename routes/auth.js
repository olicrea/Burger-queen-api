const jwt = require('jsonwebtoken');
const config = require('../config');

const { secret } = config;

module.exports = (app, nextMain) => {

  app.post('/login', (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    // TODO: Authenticate the user
    // It is necessary to confirm if the email and password
    // match a user in the database
    // If they match, send an access token created with JWT

    next();
  });

  return nextMain();
};

// O:
// instalar jsonwebtoken
// En esta ruta, verifica que el correo y la contraseña proporcionados coincidan con los datos almacenados en la base de datos.
// Si las credenciales son válidas, genera un token JWT y envíalo en la respuesta al cliente.

// Generación y verificación de tokens JWT:
// Utiliza la biblioteca jsonwebtoken para crear y verificar tokens JWT.
// Define una clave secreta para firmar los tokens. Esta clave debe mantenerse segura y no compartirse públicamente.

// Creación del token JWT:
// Cuando las credenciales son válidas, crea un token JWT con la información relevante (por ejemplo, el ID del usuario).
// Firma el token utilizando la clave secreta.
// Devuelve el token al cliente en la respuesta.
