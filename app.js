require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { appDataSource } = require('./src/models/dataSource');
const { routes } = require('./src/routes');
const errorHandler = require('./src/utils/errorHandler');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler.globalErrorHandler());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const start = async () => {
  const PORT = process.env.PORT;

  await appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
      appDataSource.destroy();
    });

  app.listen(PORT, () =>
    console.log(`server is listening on http://localhost:${PORT}`)
  );
};

start();
