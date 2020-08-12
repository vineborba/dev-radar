import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserService from '../../services/UserService';
import './DevForm.scss';

function DevForm({ onSubmit }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [coords, setCoords] = useState({
    latitude: '',
    longitude: '',
  });
  const [permit, setPermit] = useState(true);

  function askGeolocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCoords({
          longitude,
          latitude,
        });
      },
      () => {
        setPermit(false);
      },
      {
        timeout: 30000,
      },
    );
  }

  useEffect(() => {
    askGeolocation();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { latitude, longitude } = coords;

    UserService
      .registerNewUser(githubUsername, techs, longitude, latitude)
      .then((newDev) => {
        setGithubUsername('');
        setTechs([]);
        onSubmit(newDev);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="githubUsername">
          Usuário do GitHub
          <input
            name="githubUsername"
            id="githubUsername"
            required
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
        </label>
      </div>

      <div className="input-block">
        <label htmlFor="techs">
          Tecnologias que utiliza
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={(e) => setTechs(e.target.value)}
          />
        </label>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">
            Latitude
            <input
              type="number"
              name="latitude"
              id="latitude"
              value={coords.latitude}
              required
              onChange={(e) => setCoords(...coords, ...{ latitude: e.target.value })}
              disabled={!permit}
            />
          </label>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">
            Longitude
            <input
              type="number"
              name="longitude"
              id="longitude"
              value={coords.longitude}
              required
              onChange={(e) => setCoords(...coords, ...{ longitude: e.target.value })}
              disabled={!permit}
            />
          </label>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;

DevForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
