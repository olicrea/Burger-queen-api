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
