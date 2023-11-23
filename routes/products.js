const {
  requireAuth,
  requireAdmin,
} = require('../middleware/auth');

module.exports = (app, nextMain) => {

  app.get('/products', requireAuth, (req, resp, next) => {
  });

  app.get('/products/:productId', requireAuth, (req, resp, next) => {
  });

  app.post('/products', requireAdmin, (req, resp, next) => {
  });

  app.put('/products/:productId', requireAdmin, (req, resp, next) => {
  });

  app.delete('/products/:productId', requireAdmin, (req, resp, next) => {
  });

  nextMain();
};
