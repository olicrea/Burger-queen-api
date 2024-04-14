const bcrypt = require("bcrypt");
const { usersCrud } = require('../models/usersModel.js');
const usersCruded = usersCrud();
//const { default: mongoose } = require("mongoose");


module.exports = {
  // getUsers: async (req, resp, next) => { //next
  //   // TODO: Implement the necessary function to fetch the `users` collection or table
  //   const users = await usersCruded.listUsers();
  //   return resp.status(200).json(users);
  // },

  getUsers: async (req, resp, next) => {
    // TODO: Implement the necessary function to fetch the `users` collection or table
    try {
      const usersTotal = await usersCruded.listUsers();
      let { page, limit } = req.query;
      limit = limit ? parseInt(limit) : 10;
      page = page ? parseInt(page) : 1; 
  
      const skip = (page - 1) * limit;
      const usersLimit = await usersTotal.skip(skip).limit(limit);
      const users = await usersLimit.toArray();

      if (users.length === 0) {
        return resp.status(404).send("No users found");
      }
        return resp.status(200).json(users);
    } catch(error) {
      return resp.status(500).send("Error getting users" + error.message);
    }
  },

  // https://mauriciogc.medium.com/express-parte-iv-objeto-de-solicitud-request-object-req-24070845ef82#:~:text=solicitud%20HTTP%20POST%20)-,req.,la%20posici%C3%B3n%20de%20la%20URL
  getUsersBy: async (req, resp, next) => {
    const { uid } = req.params;
    const { email } = req.body;
    let user;

    if (uid.includes('@')) {
      user = await usersCruded.getInformationUserEmail(email);
    } else {
      user = await usersCruded.getInformationUserId(uid);
    }
    if (!user) {
      return resp.sendStatus(404);
    }
    return resp.json(user);
  },

// Validar direcciones de correo electrónico en formato estándar sin depender de la extensión ".com"
// Validación de la contraseña utilizando expresiones regulares.
// Verificación de si ya existe un usuario con el mismo correo electrónico.
// Creación de un nuevo usuario en la base de datos.
// Devolución de una respuesta con el ID, correo electrónico y rol del usuario creado.
  postUsers: async (req, resp, next) => {
    const { email, password, role } = req.body;

    // Validar direcciones de correo electrónico en formato estándar sin depender de la extensión ".com"
    const emailRegex = /^[\w.-]+@[a-zA-Z.-]+$/;
    if (!emailRegex.test(email)) {
      return resp.status(400).json({ error: 'Invalid email address' });
    }

    // Validación de la contraseña utilizando expresiones regulares.
    const passwordRegex = /^.{1,6}$/;
    if (!passwordRegex.test(password)) {
      return resp.status(400).json({ error: 'Invalid password' });
    }

    // Verificación de si ya existe un usuario con el mismo correo electrónico.
    try {
      const existingUser = await usersCruded.getInformationUserEmail(email);
      if (existingUser) {
        return resp.status(403).json({ error: 'User with the same email already exists' });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return resp.status(500).json({ error: 'Internal server error' });
    }

     // Validar el rol del usuario
     if (role !== 'admin' && role !== 'waiter' && role !== 'chef') {
      return resp.status(400).json({ error: 'Invalid user role' });
  }

    // Creación de un nuevo usuario en la base de datos.
    // Devolución de una respuesta con el ID, correo electrónico y rol del usuario creado.
    try {
      const user = await usersCruded.createUser({ email, password: bcrypt.hashSync(password, 10), role });
      // const tokenUser = jwt.sign({ _id: user._id, role: user.role, email: user.email }, secretKey, { expiresIn: '1h' });
      // console.log(tokenUser);
      return resp.status(200).json({user});
    } catch (err) {
      return resp.status(400).json({ error: err.message });
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
