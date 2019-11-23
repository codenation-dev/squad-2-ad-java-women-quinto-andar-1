import React from 'react';
import './FormLink.scss';
import { Link } from "react-router-dom";


const FormLink = ({ isDisabled, route, ...props }) => (
  <p className={isDisabled ? "form-link-bottom notClickable" : "form-link-bottom"}>
    {props.value}
    <Link to={route}>
      {props.children}
    </Link>
  </p>
);

export default FormLink;