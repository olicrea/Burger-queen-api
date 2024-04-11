const bcrypt = require('bcrypt');
const { usersCrud } = require('../models/usersModel.js');

const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  getUsersBy,
} = require('../controller/users');

const usersCruded = usersCrud();

// O: La función acepta dos parámetros: app y next. app es un objeto que contiene la configuración de la aplicación, y next es una función que se llamará para pasar el control al siguiente middleware o acción.
// O: Se utilizan DESTRUCTURING para extraer las propiedades adminEmail y adminPassword del objeto que se obtiene de app.get('config'). 
// O: Si cualquiera de ellos es falsy, la función next se llama y se devuelve el control al siguiente middleware o acción
const initAdminUser = async (app, next) => {
  const { adminEmail, adminPassword } = app.get('config');
  if (!adminEmail || !adminPassword) {
    return next();
  }

    const adminUsers = await usersCruded.getInformationUserEmail(adminEmail);
    console.log(adminUsers);
    if (!adminUsers) {
      const adminUser = {
        email: adminEmail,
        // O:  El password se ha encriptado utilizando bcrypt con un factor de coste de 10 (cuanto mayor es este valor es más seguro, pero también pone a trabajar más al servidor)
        password: bcrypt.hashSync(adminPassword, 10), // O: se usa método síncrono
        role: "admin",
      };
      await usersCruded.createUser(adminUser);
    }

  // TODO: Create admin user
  // First, check if adminUser already exists in the database
  // If it doesn't exist, it needs to be saved

  next();
};
  

  


/*
 * Español:
 *
 * Diagrama de flujo de una aplicación y petición en node - express :
 *
 * request  -> middleware1 -> middleware2 -> route
 *                                             |
 * response <- middleware4 <- middleware3   <---
 *
 * la gracia es que la petición va pasando por cada una de las funciones
 * intermedias o "middlewares" hasta llegar a la función de la ruta, luego esa
 * función genera la respuesta y esta pasa nuevamente por otras funciones
 * intermedias hasta responder finalmente a la usuaria.
 *
 * Un ejemplo de middleware podría ser una función que verifique que una usuaria
 * está realmente registrado en la aplicación y que tiene permisos para usar la
 * ruta. O también un middleware de traducción, que cambie la respuesta
 * dependiendo del idioma de la usuaria.
 *
 * Es por lo anterior que siempre veremos los argumentos request, response y
 * next en nuestros middlewares y rutas. Cada una de estas funciones tendrá
 * la oportunidad de acceder a la consulta (request) y hacerse cargo de enviar
 * una respuesta (rompiendo la cadena), o delegar la consulta a la siguiente
 * función en la cadena (invocando next). De esta forma, la petición (request)
 * va pasando a través de las funciones, así como también la respuesta
 * (response).
 */



module.exports = (app, next) => {

  app.get('/users', requireAdmin, getUsers);

  app.get('/users/:uid', requireAuth, getUsersBy);

  app.post('/users', requireAdmin, postUsers);

  app.put('/users/:uid', requireAuth, putUsers);

  app.delete('/users/:uid', requireAuth, deleteUsers);

  initAdminUser(app, next);
};
