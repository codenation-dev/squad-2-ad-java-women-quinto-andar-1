import React from 'react';
import './Input.css';

const Input = ({ type, name, onChange, value, ...props }) => (
  <input className="form-control"
    type={type} 
    name={name} 
    onChange={onChange} 
    value={value} 
    {...props} 
  />
)

export default Input;