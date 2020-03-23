import React from 'react';
import './App.scss';
import Users from './Users/Users';
import Hobbies from './Hobbies/Hobbies';

function App() {
  return (
    <div className='App'>
      User hobbies
      <div className='table'>
        <Users/>
        <Hobbies/>
      </div>
    </div>
  );
}

export default App;
