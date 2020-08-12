const Dev = require('../models/Dev');

const createDev = (newDev) => Dev.create(newDev);

const findDevByGithubUsername = (githubUsername) => Dev.findOne({ githubUsername });

const findAllDevs = () => Dev.find();

const findDevsByLocationAndTechs = (techs, latitude, longitude) => Dev.find({
  techs: {
    $in: techs,
  },
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      $maxDistance: 10000,
    },
  },
});

module.exports.findDevByGithubUsername = findDevByGithubUsername;
module.exports.createDev = createDev;
module.exports.findAllDevs = findAllDevs;
module.exports.findDevsByLocationAndTechs = findDevsByLocationAndTechs;
