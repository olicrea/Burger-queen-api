const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { secret } = config;
const { usersCrud } = require('../models/usersModel.js');
const usersCruded = usersCrud();

// O: app es una instancia de una aplicación Express, y nextMain es una función que se llamará después de que se configuren todas las rutas.
module.exports = (app, nextMain) => {

  // O: se define post para login. escucha las solicitudes POST en el endpoint /login.
  app.post('/login', async (req, resp, next) => { 

    // O: Extrae email y contraseña del cuerpo de la solicitud, que el usuario enviará al iniciar sesión
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return next(400);
      // O: resp es un objeto que representa la respuesta HTTP que se enviará al cliente
      return resp.status(400).json({error: "Bad request, email and password are required" });
    }
    
    // TODO: Authenticate the user
    // It is necessary to confirm if the email and password. O: Como es "y" si no está el email es suficiente para saber que no existe
      const user = await usersCruded.getInformationUserEmail(email);
      console.log('identificando user', user);
      console.log('identificando email', email);

      if (!user) {
        return resp.status(404).json({error: "Not found, user not found" });
      }
      
      console.log(password);
      console.log(user.password);
      // match a user in the database
      const match = await bcrypt.compare(password, user.password);
      if(!match){
        return resp.status(404).json({ error: "Invalid credentials, invalid password" });
      }
        // If they match, send an access token created with JWT - jwt.sign()
        const token = jwt.sign({_id: user._id, role: user.role, email: user.email}, secret, {expiresIn: '1h'});
        console.log(token);
        // Enviar el token de acceso como respuesta json. Successful operation
        return resp.status(200).json({ token: token, user });
    }

    catch(error){
      console.error(error);
      return resp.status(500).json({ error: "Internal server error" });
    }

  });

  return nextMain();
};

// O:
// Usando AI
// instalar jsonwebtoken: listo
// En esta ruta, verifica que el correo y la contraseña proporcionados coincidan con los datos almacenados en la base de datos: listo
// Si las credenciales son válidas, genera un token JWT y envíalo en la respuesta al cliente: listo

// Generación y verificación de tokens JWT:
// Utiliza la biblioteca jsonwebtoken para crear y verificar tokens JWT.
// Define una clave secreta para firmar los tokens. Esta clave debe mantenerse segura y no compartirse públicamente: listo

// Creación del token JWT:
// Cuando las credenciales son válidas, crea un token JWT con la información relevante (por ejemplo, el ID del usuario): listo
// Firma el token utilizando la clave secreta: listo
// Devuelve el token al cliente en la respuesta: listo
