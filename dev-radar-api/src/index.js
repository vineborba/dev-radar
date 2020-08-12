require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./configs/logger');
const { initDB } = require('./configs/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use('/api', routes);

async function initServer() {
  try {
    await initDB();
    app.listen(port, () => logger.info(`Server listening on port ${port}!`));
  } catch (e) {
    logger.error('initServer.error: ', e);
    process.exit(1);
  }
}

initServer();
