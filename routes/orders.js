const {
  requireAuth,
} = require('../middleware/auth');

module.exports = (app, nextMain) => {
  app.get('/orders', requireAuth, (req, resp, next) => {
  });

  app.get('/orders/:orderId', requireAuth, (req, resp, next) => {
  });

  app.post('/orders', requireAuth, (req, resp, next) => {
  });

  app.put('/orders/:orderId', requireAuth, (req, resp, next) => {
  });

  app.delete('/orders/:orderId', requireAuth, (req, resp, next) => {
  });

  nextMain();
};
