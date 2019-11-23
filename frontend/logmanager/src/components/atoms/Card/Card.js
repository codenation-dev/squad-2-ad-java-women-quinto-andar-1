import React from 'react';
import './Card.scss';

const Card = props => (
  <div className="container">
    <div className="container-box">
        {props.children}
    </div>
  </div>
);

export default Card;