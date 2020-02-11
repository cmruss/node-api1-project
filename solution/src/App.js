import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';

function App() {

  const [hobbits, setHobbits] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        console.log(res)
        setHobbits(res.data)
      })
      .catch(err => console.log(err.response));
  }, [hobbits, setHobbits])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          USERS
        </p>
          <UserList hobbits={hobbits} />
      </header>
    </div>
  );
}

export default App;
