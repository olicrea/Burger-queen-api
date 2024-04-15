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
      req.userId === uid;

    if (!isAdminOrSameUser) {
      return resp.status(403).send('Unauthorized to access this user');
    }

    if (uid.includes('@')) {
      emailValid = /^[\w.-]+@[a-zA-Z.-]+$/.test(uid);
      if (!emailValid){
        return resp.status(400).send('Invalid email address (getUsersBy)');
      }
      user = await usersCruded.getInformationUserEmail(emailValid);
    } else {
      user = await usersCruded.getInformationUserId(uid);
    }
    if (!user) {
      return resp.status(404).send('No users found (getUsersBy)');
    }
    return resp.json(user);
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

    if (!email && !password && !role) {
      return resp.sendStatus(400);
    }

    const update = {};
      if (email) update.email = email;
      if (password) update.password = await bcrypt.hashSync(password, 10);
      if (role) update.role = role;

      try {
        let updatedUser;
        if (uid.includes('@')) {
          updatedUser = await usersCruded.modifyUserEmail(email, update);
        } else {
          updatedUser = await usersCruded.modifyUserId(uid, update);
        }
        return resp.status(200).json(updatedUser);
      } catch (error) {
        return resp.status(400).json({ error: error.message });
      }
  },

  deleteUsers: async (req, resp, next) => {
    const { uid } = req.params;
    const { email } = req.body;
    let deletedResult;

    if (uid.includes('@')) {
      deletedResult = await usersCruded.deleteUserEmail(email);
    } else {
      deletedResult = await usersCruded.deleteUserId(uid);
    }
    if (!deletedResult) {
      return resp.sendStatus(404);
    }
    return resp.json(deletedResult);
  }

};
