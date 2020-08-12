import React from 'react';
import PropTypes from 'prop-types';
import DevInfoCard from '../DevInfoCard';
import './DevList.scss';

function DevList({ devs }) {
  function renderDevInfoCard() {
    if (devs.length) {
      return devs.map((dev) => (
        <DevInfoCard key={dev.devId} dev={dev} />
      ));
    }
    return <></>;
  }

  return (
    <main>
      <ul>
        {renderDevInfoCard()}
      </ul>
    </main>
  );
}

export default DevList;

DevList.propTypes = {
  devs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
