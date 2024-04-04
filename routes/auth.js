const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// O: jsonwebtoken, se utiliza para crear y verificar tokens de acceso.
const config = require('../config');
// O: config contiene clave secreta para firmar los tokens?
//  si. exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
//  por eso se extrae la propiedad secret del objeto config, a continuación
const { secret } = config;
const { usersCrud } = require('../models/usersModel.js');
const usersCruded = usersCrud();

// O:app es una instancia de una aplicación Express, y nextMain es una función que se llamará después de que se configuren todas las rutas.
module.exports = (app, nextMain) => {

  // O: se define una post para login
  //  escucha las solicitudes POST en el endpoint /login.
  app.post('/login', async (req, resp, next) => {

    // O:Extrae email y contraseña del cuerpo de la solicitud, que el usuario enviará al iniciar sesión
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    // TODO: Authenticate the user
    // It is necessary to confirm if the email and password. 
    // O: Como es "y" si no está el email es suficiente para saber que no existe
    try {
      const user = await usersCruded.getInformationUserEmail(email);
      console.log('identificando user', user);
      console.log('identificando email', email);

      if (!user) {
        return next(404);
      }
      
      // match a user in the database
      console.log(password);
      console.log(user.password);
      const match = await bcrypt.compare(password, user.password);

      if(match){
        // If they match, send an access token created with JWT - jwt.sign()

        const accessToken = jwt.sign({email: user.email}, secret);
        // Enviar el token de acceso como respuesta json
        return resp.json({ accessToken: accessToken });
        // return next(200);
      }
      
    }

    catch(error){
      console.error(error);
      return next();
    }

  });

  return nextMain();
};

// jwt.sign()
// biblioteca jsonwebtoken para crear y verificar tokens JWT
// crea un token JWT con la información relevante
// entrega el token al cliente

// O:
// Usando AI
// instalar jsonwebtoken: listo
// En esta ruta, verifica que el correo y la contraseña proporcionados coincidan con los datos almacenados en la base de datos: entendido
// Si las credenciales son válidas, genera un token JWT y envíalo en la respuesta al cliente: entendido

// Generación y verificación de tokens JWT:
// Utiliza la biblioteca jsonwebtoken para crear y verificar tokens JWT.
// Define una clave secreta para firmar los tokens. Esta clave debe mantenerse segura y no compartirse públicamente: listo

// Creación del token JWT:
// Cuando las credenciales son válidas, crea un token JWT con la información relevante (por ejemplo, el ID del usuario).
// Firma el token utilizando la clave secreta.
// Devuelve el token al cliente en la respuesta.


