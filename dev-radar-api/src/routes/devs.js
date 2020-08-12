const express = require('express');
const logger = require('../configs/logger');
const {
  registerNewDev,
  listAllDevs,
  listDevsByLocationAndTechs,
} = require('../controllers/devController');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const response = await registerNewDev(req.body);
    logger.debug('res: ', response);
    res.status(201).send(response);
  } catch (error) {
    logger.error(`devs:post:registerNewDev:${error.message}`);
    res.sendStatus(422);
  }
});

router.get('/', async (req, res) => {
  try {
    const response = await listAllDevs();

    res.status(200).send(response);
  } catch (error) {
    logger.error(`devs:get:listAllDevs:${error.message}`);
    res.sendStatus(422);
  }
});

router.get('/search', async (req, res) => {
  try {
    const { techs, latitude, longitude } = req.query;
    const response = await listDevsByLocationAndTechs(techs, latitude, longitude);

    res.status(200).send(response);
  } catch (error) {
    logger.error(`devs:get:listDevsByLocationAndTechs:${error.message}`);
    res.sendStatus(422);
  }
});

module.exports = router;
