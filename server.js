require('dotenv').config();

const { createApp } = require('./app');
const { appDataSource } = require('./src/models/dataSource');

const start = async () => {
  const app = createApp();
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
