import React from 'react';
import './FormLink.css';
import { Link } from "react-router-dom";


const FormLink = ({ isDisabled, route, ...props }) => (
  <p className={isDisabled ? "notClickable" : undefined}>
    <Link to={route}>
      {props.children}
    </Link>
  </p>
);

export default FormLink;