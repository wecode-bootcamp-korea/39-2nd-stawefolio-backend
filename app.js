const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { routes } = require('./src/routes');
const errorHandler = require('./src/utils/errorHandler');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(routes);
  app.use(errorHandler.globalErrorHandler);

  app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
  });

  return app;
};

module.exports = { createApp };
