import React from 'react';
import PropTypes from 'prop-types';
import DevForm from '../DevForm';
import './Sidebar.scss';

function Sidebar({ onSubmit }) {
  return (
    <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={onSubmit} />
    </aside>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
