import React from 'react';
import './Input.scss';

const Input = ({ className, type, name, onChange, value, ...props }) => (
  <input className={className}
    type={type} 
    name={name} 
    onChange={onChange} 
    value={value} 
    {...props} 
  />
)

export default Input;