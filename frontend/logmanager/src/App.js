import React from 'react';
import './App.css';
import Login from './pages/Login/Login';

const App = (props) => (
  <div className="App">
    <Login {...props} />
  </div>
);

export default App;
