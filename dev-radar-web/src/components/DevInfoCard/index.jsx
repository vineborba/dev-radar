import React from 'react';
import PropTypes from 'prop-types';
import './DevInfoCard.scss';

function DevInfoCard({ dev }) {
  return (
    <li className="devItem">
      <header>
        <img src={dev.avatarUrl} alt={dev.name} />
        <div className="userInfo">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.githubUsername}`}>Acesse o perfil do GitHub</a>
        </div>
      </header>
    </li>
  );
}

export default DevInfoCard;

DevInfoCard.propTypes = {
  dev: PropTypes.shape({
    devId: PropTypes.string,
    githubUsername: PropTypes.string,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    bio: PropTypes.string,
    techs: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
};
