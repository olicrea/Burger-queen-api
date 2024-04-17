const bcrypt = require("bcrypt");
const { usersCrud } = require('../models/usersModel.js');
const usersCruded = usersCrud();

module.exports = {

  getUsers: async (req, resp, next) => {
    try {
      if (req.user.role !== 'admin') {
        return resp.status(403).send('User is not an admin');
      }
  
      let { page, limit } = req.query;
      limit = limit ? parseInt(limit) : 10;
      page = page ? parseInt(page) : 1;
  
      // Llamar a la función listUsers con los parámetros de paginación
      const users = await usersCruded.listUsers(page, limit);
  
      if (users.length === 0) {
        return resp.status(404).send("No users found");
      }
  
      return resp.status(200).json(users);
    } catch (error) {
      return resp.status(500).send("Error getting users");
    }
  },

  // https://mauriciogc.medium.com/express-parte-iv-objeto-de-solicitud-request-object-req-24070845ef82#:~:text=solicitud%20HTTP%20POST%20)-,req.,la%20posici%C3%B3n%20de%20la%20URL
  getUsersBy: async (req, resp, next) => {
    const { uid } = req.params;
    let user;

    const isAdminOrSameUser =
      req.user.role === 'admin' ||
      req.user.email === uid ||
      req.user._id === uid;

    if (!isAdminOrSameUser) {
      return resp.status(403).send('Unauthorized to access this user');
    }

    try {

      if (uid.includes('@')) {
        emailValid = /^[\w.-]+@[a-zA-Z.-]+$/.test(uid);
        if (!emailValid){
          return resp.status(400).send('Invalid email address (getUsersBy)');
        }
        user = await usersCruded.getInformationUserEmail(uid);
      } else {
        user = await usersCruded.getInformationUserId(uid);
      }
      if (!user) {
        return resp.status(404).send('No users found (getUsersBy)');
      }
      return resp.json(user);
    } catch (error){
      return resp.status(500).send("Error getting user");
    }
  },

  postUsers: async (req, resp, next) => {
    const { email, password, role } = req.body;

    // Validar direcciones de correo electrónico en formato estándar sin depender de la extensión ".com"
    const emailRegex = /^[\w.-]+@[a-zA-Z.-]+$/;
    if (!emailRegex.test(email)) {
      return resp.status(400).send('Invalid email address');
    }

    // Validación de la contraseña utilizando expresiones regulares.
    const passwordRegex = /^.{1,6}$/;
    if (!passwordRegex.test(password)) {
      return resp.status(400).send('Invalid password');
    }

    // Verificación de si ya existe un usuario con el mismo correo electrónico.
    try {
      const existingUser = await usersCruded.getInformationUserEmail(email);
      if (existingUser) {
        return resp.status(403).send('User with the same email already exists');
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return resp.status(500).send('Internal server error');
    }

     // Validar el rol del usuario
     if (role !== 'admin' && role !== 'waiter' && role !== 'chef') {
      return resp.status(400).send('Invalid user role');
    }

    // Creación de un nuevo usuario en la base de datos.
    // Devolución de una respuesta con el ID, correo electrónico y rol del usuario creado.
    try {
      const user = await usersCruded.createUser({ email, password: bcrypt.hashSync(password, 10), role });
      const responseData = {
        _id: user.id,
        email: user.email,
        role: user.role,
      };
      return resp.status(200).json(responseData);
    } catch (err) {
      return resp.status(400).send(err.message);
    }
  },

  putUsers: async (req, resp, next) => {
    const { uid } = req.params;
    const { email, password, role } = req.body;
    
      
    // Verificar si es usuario dueño de cuenta o admin 
    if (
      req.user.role !== 'admin' &&
      req.user.email !== uid &&
      req.user._id !== uid
    ) {
      return resp.status(403).send('Unauthorized to update this user');
    }
  
    // Verificar si se proporcionan propiedades para actualizar
    if (!email && !password && !role) {
      return resp.status(400).send('No properties provided for update');
    }
  
    const update = {};
    if (email) update.email = email;
    if (password) update.password = await bcrypt.hashSync(password, 10);
    if (role) update.role = role;
  
    try {
      let updatedUser;
      if (uid.includes('@')) {
        updatedUser = await usersCruded.modifyUserEmail(uid, update);
      } else {
        updatedUser = await usersCruded.modifyUserId(uid, update);
      }
      return resp.status(200).json(updatedUser);
    } catch (error) {
      return resp.status(400).send('Request error');
    }
  },
  

  deleteUsers: async (req, resp, next) => {
    const { uid } = req.params;
    const { email } = req.body;

    try {
          
      // Verificar si el usuario es un administrador
      if (req.user.role === 'admin') {
        // Permitir al administrador borrar otros usuarios
        let deletedResult;
        if (uid.includes('@')) {
          deletedResult = await usersCruded.deleteUserEmail(uid);
        } else {
          deletedResult = await usersCruded.deleteUserId(uid);
        }

        if (!deletedResult) {
          return resp.status(404).send('Error deleting user');
        }

        return resp.status(200).send('User deleted successfully');
      } else {
        // Restringir la eliminación del propio usuario
        if ((req.user.email === uid || 
          req.user._id === uid) && 
          (req.user.role !== 'admin')) {
          // Permitir que un usuario no administrador se borre a sí mismo
          let deletedResult;
          if (uid.includes('@')) {
            deletedResult = await usersCruded.deleteUserEmail(uid);
          } else {
            deletedResult = await usersCruded.deleteUserId(uid);
          }

          if (!deletedResult) {
            return resp.status(404).send('Error deleting user');
          }

          return resp.status(200).send('User deleted successfully');
        } else {
          return resp.status(403).send('Unauthorized to delete this user');
        }
      }
    } catch (error) {
      // Manejar el error
    }
  }


};

// const isAuthorizedToDelete = (req, uid, email) => {
//   // Si el usuario no está autenticado, no tiene permiso
//   if (!req.user) {
//       return false;
//   }
//   // Si el usuario es un administrador, tiene permiso
//   if (req.user.role === 'admin') {
//       return true;
//   }
//   // Si el usuario está eliminando su propio usuario, tiene permiso
//   if (req.user.email === email || req.user._id === uid) {
//       return true;
//   }
//   return false;
// }
