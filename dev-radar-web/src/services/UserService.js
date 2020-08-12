import axios from '../middleware/axios';

class UserService {
  static registerNewUser(githubUsername, techs, longitude, latitude) {
    const url = '/devs/register';
    return axios.post(
      url, {
        githubUsername,
        latitude,
        longitude,
        techs,
      },
    ).then((res) => res.data)
      .catch((e) => console.log(e));
  }

  static listUsers() {
    const url = '/devs';
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
}

export default UserService;
