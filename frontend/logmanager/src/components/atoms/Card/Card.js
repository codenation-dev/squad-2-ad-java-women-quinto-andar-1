import React from 'react';
import './Card.css';

const Card = props => (
  <div className="content">
  <div className="container-principal">
    {props.children}
  </div>
  </div>
);

export default Card;