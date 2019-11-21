import React from 'react';
import './Field.css';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';

const Field = ({ disabled, ...props }) => (
	<div>
    <Label>{props.label}</Label>
    <Input 
      name={props.name}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      disabled={disabled}
      {...props}
    />
  </div>
);

export default Field;