// O: Se importan varios módulos necesarios para construir una aplicación web con Express
const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth'); // O: middleware personalizado para la autenticación.
const errorHandler = require('./middleware/error'); // O: middleware personalizado para manejar errores
const routes = require('./routes');
const pkg = require('./package.json');
const { connect } = require('./connect');

const { port, secret } = config;
const app = express(); // instancia de aplicación express

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

connect(); // conexión a db

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
