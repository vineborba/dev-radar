const axios = require('axios');
const { convertTechsStringToArray } = require('../utils/utils');

const {
  createDev,
  findDevByGithubUsername,
  findAllDevs,
  findDevsByLocationAndTechs,
} = require('../services/devService');


const converNewDevToDbJSON = (
  githubUsername, githubResponse, techs, location,
) => ({
  githubUsername,
  name: githubResponse.name || githubResponse.login,
  avatarUrl: githubResponse.avatar_url,
  bio: githubResponse.bio,
  techs: convertTechsStringToArray(techs),
  location,
});

const convertDevToJSON = (dev) => ({
  devId: dev._id,
  githubUsername: dev.githubUsername,
  name: dev.name,
  avatarUrl: dev.avatarUrl,
  bio: dev.bio,
  techs: dev.techs,
  location: dev.location,
});

const registerNewDev = async (newUserRequest) => {
  const {
    githubUsername, techs, latitude, longitude,
  } = newUserRequest;

  const user = await findDevByGithubUsername(githubUsername);

  if (!user) {
    const url = `http://api.github.com/users/${githubUsername}`;

    const githubResponse = await axios.get(url).then(({ data }) => data);

    const location = {
      type: 'Point',
      coordinates: [
        longitude,
        latitude,
      ],
    };
    const newDev = converNewDevToDbJSON(githubUsername, githubResponse, techs, location);

    return createDev(newDev).then((dev) => convertDevToJSON(dev));
  }

  return { message: 'Developer.already.registered' };
};

const listAllDevs = async () => {
  const devs = await findAllDevs();
  return devs.map((dev) => convertDevToJSON(dev));
};

const listDevsByLocationAndTechs = (techsString, latitude, longitude) => {
  const techs = convertTechsStringToArray(techsString);

  return findDevsByLocationAndTechs(techs, latitude, longitude);
};

module.exports.registerNewDev = registerNewDev;
module.exports.listAllDevs = listAllDevs;
module.exports.listDevsByLocationAndTechs = listDevsByLocationAndTechs;
