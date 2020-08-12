const winston = require('winston');

const loggerLevel = process.env.OMNI_LOGGER_LEVEL || 'debug';

const logger = winston.createLogger({
  level: loggerLevel,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
