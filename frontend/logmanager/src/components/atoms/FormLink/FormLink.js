import React from 'react';
import './FormLink.scss';

const FormLink = props => (
  <p className="form-link-bottom">
    {props.children}
  </p>
);

export default FormLink;