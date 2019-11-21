import React from 'react';
import './App.scss';
import Routes from './routes';

const App = (props) => (
  <div className="App">
    <Routes {...props} />
  </div>
);

export default App;
