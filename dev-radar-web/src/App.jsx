import React, { useEffect, useState } from 'react';
import UserService from './services/UserService';
import Sidebar from './components/Sidebar';
import DevList from './components/DevList';
import './Global.scss';
import './App.scss';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    UserService.listUsers()
      .then((res) => {
        setDevs(res);
      })
      .catch(() => setDevs([]));
  }, []);

  function submitNewDev(newDev) {
    setDevs([...devs, newDev]);
  }

  return (
    <div id="app">
      <Sidebar onSubmit={submitNewDev} />
      <DevList devs={devs} />
    </div>
  );
}

export default App;
