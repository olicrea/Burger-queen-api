// //____________1RA OPCIÓN

// const bcrypt = require('bcrypt');
// const { adminUserFind, createUser } = require('../models/usersModel.js');

// const {
//   requireAuth,
//   requireAdmin,
// } = require('../middleware/auth');

// const {
//   getUsers,
// } = require('../controller/users');


// // O: La función acepta dos parámetros: app y next. app es un objeto que contiene la configuración de la aplicación, y next es una función que se llamará para pasar el control al siguiente middleware o acción.
// // O: Se utilizan DESTRUCTURING para extraer las propiedades adminEmail y adminPassword del objeto que se obtiene de app.get('config'). 
// // O: Si cualquiera de ellos es falsy, la función next se llama y se devuelve el control al siguiente middleware o acción
// const initAdminUser = async (app, next) => {
//   const { adminEmail, adminPassword } = app.get('config');
//   if (!adminEmail || !adminPassword) {
//     return next();
//   }

//   try {
//     const adminUsers = await adminUserFind();
//     console.log('Usuarios administradores:', adminUsers);
    
//     if (!adminUsers) {
//       const adminUser = {
//         email: adminEmail,
//         // O:  El password se ha encriptado utilizando bcrypt con un factor de coste de 10 (cuanto mayor es este valor es más seguro, pero también pone a trabajar más al servidor)
//         password: bcrypt.hashSync(adminPassword, 10), // O: se usa método síncrono
//         role: "admin",
//       };
//       await  createUser(adminUser);
//     }
//   }
//   catch(error){
//     console.log(error);
//   }
  
//   // TODO: Create admin user
//   // First, check if adminUser already exists in the database
//   // If it doesn't exist, it needs to be saved

//   next();
// };
  

  


// /*
//  * Español:
//  *
//  * Diagrama de flujo de una aplicación y petición en node - express :
//  *
//  * request  -> middleware1 -> middleware2 -> route
//  *                                             |
//  * response <- middleware4 <- middleware3   <---
//  *
//  * la gracia es que la petición va pasando por cada una de las funciones
//  * intermedias o "middlewares" hasta llegar a la función de la ruta, luego esa
//  * función genera la respuesta y esta pasa nuevamente por otras funciones
//  * intermedias hasta responder finalmente a la usuaria.
//  *
//  * Un ejemplo de middleware podría ser una función que verifique que una usuaria
//  * está realmente registrado en la aplicación y que tiene permisos para usar la
//  * ruta. O también un middleware de traducción, que cambie la respuesta
//  * dependiendo del idioma de la usuaria.
//  *
//  * Es por lo anterior que siempre veremos los argumentos request, response y
//  * next en nuestros middlewares y rutas. Cada una de estas funciones tendrá
//  * la oportunidad de acceder a la consulta (request) y hacerse cargo de enviar
//  * una respuesta (rompiendo la cadena), o delegar la consulta a la siguiente
//  * función en la cadena (invocando next). De esta forma, la petición (request)
//  * va pasando a través de las funciones, así como también la respuesta
//  * (response).
//  */

// /*
//  * Português Brasileiro:
//  *
//  * Fluxo de uma aplicação e requisição em node - express:
//  *
//  * request  -> middleware1 -> middleware2 -> rota
//  *                                             |
//  * response <- middleware4 <- middleware3   <---
//  *
//  * A essência é que a requisição passa por cada uma das funções intermediárias
//  * ou "middlewares" até chegar à função da rota; em seguida, essa função gera a
//  * resposta, que passa novamente por outras funções intermediárias até finalmente
//  * responder à usuária.
//  *
//  * Um exemplo de middleware poderia ser uma função que verifica se uma usuária
//  * está realmente registrada na aplicação e tem permissões para usar a rota. Ou
//  * também um middleware de tradução, que altera a resposta dependendo do idioma
//  * da usuária.
//  *
//  * É por isso que sempre veremos os argumentos request, response e next em nossos
//  * middlewares e rotas. Cada uma dessas funções terá a oportunidade de acessar a
//  * requisição (request) e cuidar de enviar uma resposta (quebrando a cadeia) ou
//  * delegar a requisição para a próxima função na cadeia (invocando next). Dessa
//  * forma, a requisição (request) passa através das funções, assim como a resposta
//  * (response).
//  */

// module.exports = (app, next) => {

//   app.get('/users', requireAdmin, getUsers);

//   app.get('/users/:uid', requireAuth, (req, resp) => {
//   });

//   app.post('/users', requireAdmin, (req, resp, next) => {
//     // TODO: Implement the route to add new users
//   });

//   app.put('/users/:uid', requireAuth, (req, resp, next) => {
//   });

//   app.delete('/users/:uid', requireAuth, (req, resp, next) => {
//   });

//   initAdminUser(app, next);
// };

// //______________________

// const { default: mongoose } = require("mongoose");

// const usersSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'waiter', 'chef'],
//         required: true
//     }
//     // O: Mongodb automáticamente agrega un identificador único (_id) para cada documento en una colección 
// });


//     const model = mongoose.model('users', usersSchema); // O: 'users' es la colección en la db

//     // O: métodos de instancia - https://mongoosejs.com/docs/guide.html#methods
//     const listUsers = async ()=>{
//         const result = await model.find({});
//         return result;
//         // O: Query.prototype.limit()
//         // O: query.limit(10);
//         // O: Un objeto de tipo Query en Mongoose representa una consulta que se puede ejecutar en la base de datos. No es el resultado de la consulta en sí, sino una representación de la consulta que se puede modificar o ejecutar más adelante.
//     };

//     const adminUserFind = async ()=>{
//         try {
//             const result = await model.find({ role: 'admin'});
//             return result;
//         }
//         catch(error){
//             console.error(error);
//         }
//     }; 

//     const createUser = async (user)=>{
//         const result = await model.create(user);
//         console.log(result);
//         return result;
//     };

//     const getInformationUserId = async (id)=>{
//         const result = await model.findById({ _id: id });
//         return result;
//     };

//     const getInformationUserEmail = async (email)=>{
//         const result = await model.findOne({ email: email });
//         return result;
//     };

//     const modifyUserId = async (id, update)=>{
//         const result = await model.findByIdAndUpdate({ _id: id }, update);
//         return result;
//     };

//     const modifyUserEmail = async (email, update)=>{
//         const result = await model.findOneAndUpdate({ email: email }, update); 
//         // O: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//         return result;    
//     };

//     const deleteUserId = async (id)=>{
//         const result = await model.findByIdAndDelete({ _id: id });
//         return result;    
//     };

//     const deleteUserEmail = async (email)=>{
//         const result = await model.findOneAndDelete({ email: email });
//         return result;    
//     };




// module.exports = {
//     listUsers,
//     adminUserFind,
//     createUser,
//     getInformationUserId,
//     getInformationUserEmail,
//     modifyUserId,
//     modifyUserEmail,
//     deleteUserId,
//     deleteUserEmail

// };

// //_____________________2DA OPCIÓN

// const bcrypt = require('bcrypt');
// const { usersCrud } = require('../models/usersModel.js');

// const {
//   requireAuth,
//   requireAdmin,
// } = require('../middleware/auth');

// const {
//   getUsers,
// } = require('../controller/users');

// const usersCruded = usersCrud();

// // O: La función acepta dos parámetros: app y next. app es un objeto que contiene la configuración de la aplicación, y next es una función que se llamará para pasar el control al siguiente middleware o acción.
// // O: Se utilizan DESTRUCTURING para extraer las propiedades adminEmail y adminPassword del objeto que se obtiene de app.get('config'). 
// // O: Si cualquiera de ellos es falsy, la función next se llama y se devuelve el control al siguiente middleware o acción
// const initAdminUser = async (app, next) => {
//   const { adminEmail, adminPassword } = app.get('config');
//   if (!adminEmail || !adminPassword) {
//     return next();
//   }

//   try {
//     const adminUsers = await usersCruded.adminUserFind();
//     console.log('Usuarios administradores:', adminUsers);
    
//     if (!adminUsers) {
//       const adminUser = {
//         email: adminEmail,
//         // O:  El password se ha encriptado utilizando bcrypt con un factor de coste de 10 (cuanto mayor es este valor es más seguro, pero también pone a trabajar más al servidor)
//         password: bcrypt.hashSync(adminPassword, 10), // O: se usa método síncrono
//         role: "admin",
//       };
//       await usersCruded.createUser(adminUser);
//     }
//   }
//   catch(error){
//     console.log(error);
//   }
  
//   // TODO: Create admin user
//   // First, check if adminUser already exists in the database
//   // If it doesn't exist, it needs to be saved

//   next();
// };
  

  


// /*
//  * Español:
//  *
//  * Diagrama de flujo de una aplicación y petición en node - express :
//  *
//  * request  -> middleware1 -> middleware2 -> route
//  *                                             |
//  * response <- middleware4 <- middleware3   <---
//  *
//  * la gracia es que la petición va pasando por cada una de las funciones
//  * intermedias o "middlewares" hasta llegar a la función de la ruta, luego esa
//  * función genera la respuesta y esta pasa nuevamente por otras funciones
//  * intermedias hasta responder finalmente a la usuaria.
//  *
//  * Un ejemplo de middleware podría ser una función que verifique que una usuaria
//  * está realmente registrado en la aplicación y que tiene permisos para usar la
//  * ruta. O también un middleware de traducción, que cambie la respuesta
//  * dependiendo del idioma de la usuaria.
//  *
//  * Es por lo anterior que siempre veremos los argumentos request, response y
//  * next en nuestros middlewares y rutas. Cada una de estas funciones tendrá
//  * la oportunidad de acceder a la consulta (request) y hacerse cargo de enviar
//  * una respuesta (rompiendo la cadena), o delegar la consulta a la siguiente
//  * función en la cadena (invocando next). De esta forma, la petición (request)
//  * va pasando a través de las funciones, así como también la respuesta
//  * (response).
//  */

// /*
//  * Português Brasileiro:
//  *
//  * Fluxo de uma aplicação e requisição em node - express:
//  *
//  * request  -> middleware1 -> middleware2 -> rota
//  *                                             |
//  * response <- middleware4 <- middleware3   <---
//  *
//  * A essência é que a requisição passa por cada uma das funções intermediárias
//  * ou "middlewares" até chegar à função da rota; em seguida, essa função gera a
//  * resposta, que passa novamente por outras funções intermediárias até finalmente
//  * responder à usuária.
//  *
//  * Um exemplo de middleware poderia ser uma função que verifica se uma usuária
//  * está realmente registrada na aplicação e tem permissões para usar a rota. Ou
//  * também um middleware de tradução, que altera a resposta dependendo do idioma
//  * da usuária.
//  *
//  * É por isso que sempre veremos os argumentos request, response e next em nossos
//  * middlewares e rotas. Cada uma dessas funções terá a oportunidade de acessar a
//  * requisição (request) e cuidar de enviar uma resposta (quebrando a cadeia) ou
//  * delegar a requisição para a próxima função na cadeia (invocando next). Dessa
//  * forma, a requisição (request) passa através das funções, assim como a resposta
//  * (response).
//  */

// module.exports = (app, next) => {

//   app.get('/users', requireAdmin, getUsers);

//   app.get('/users/:uid', requireAuth, (req, resp) => {
//   });

//   app.post('/users', requireAdmin, (req, resp, next) => {
//     // TODO: Implement the route to add new users
//   });

//   app.put('/users/:uid', requireAuth, (req, resp, next) => {
//   });

//   app.delete('/users/:uid', requireAuth, (req, resp, next) => {
//   });

//   initAdminUser(app, next);
// };






// //_____________________

// const { default: mongoose } = require("mongoose");

// const usersSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['admin', 'waiter', 'chef'],
//         required: true
//     }
//     // O: Mongodb automáticamente agrega un identificador único (_id) para cada documento en una colección 
// });


// const usersCrud = ()=>{
//     const model = mongoose.model('users', usersSchema); // O: 'users' es la colección en la db

//     // O: métodos de instancia - https://mongoosejs.com/docs/guide.html#methods
//     const listUsers = async ()=>{
//         const result = await model.find({});
//         return result;
//         // O: Query.prototype.limit()
//         // O: query.limit(10);
//         // O: Un objeto de tipo Query en Mongoose representa una consulta que se puede ejecutar en la base de datos. No es el resultado de la consulta en sí, sino una representación de la consulta que se puede modificar o ejecutar más adelante.
//     };

//     const adminUserFind= async ()=>{
//         try {
//             const result = await model.find({ role: 'admin'});
//             return result;
//         }
//         catch(error){
//             console.error(error);
//         }
//     }; 

//     const createUser = async (user)=>{
//         const result = await model.create(user);
//         console.log(result);
//         return result;
//     };

//     const getInformationUserId = async (id)=>{
//         const result = await model.findById({ _id: id });
//         return result;
//     };

//     const getInformationUserEmail = async (email)=>{
//         const result = await model.findOne({ email: email });
//         return result;
//     };

//     const modifyUserId = async (id, update)=>{
//         const result = await model.findByIdAndUpdate({ _id: id }, update);
//         return result;
//     };

//     const modifyUserEmail = async (email, update)=>{
//         const result = await model.findOneAndUpdate({ email: email }, update); 
//         // O: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//         return result;    
//     };

//     const deleteUserId = async (id)=>{
//         const result = await model.findByIdAndDelete({ _id: id });
//         return result;    
//     };

//     const deleteUserEmail = async (email)=>{
//         const result = await model.findOneAndDelete({ email: email });
//         return result;    
//     };

//     return {
//         listUsers,
//         adminUserFind,
//         createUser,
//         getInformationUserId,
//         getInformationUserEmail,
//         modifyUserId,
//         modifyUserEmail,
//         deleteUserId,
//         deleteUserEmail 

//     };
// };

// module.exports = { usersCrud };

