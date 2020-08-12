import axios from '../middlewares/axios';

class DevService {
  static loadDevs(data) {
    const { techs, latitude, longitude } = data;
    const url = `/devs/search?techs=${techs}&latitude=${latitude}&longitude=${longitude}`;
    return axios.get(url)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return [];
      });
  }
}

export default DevService;
