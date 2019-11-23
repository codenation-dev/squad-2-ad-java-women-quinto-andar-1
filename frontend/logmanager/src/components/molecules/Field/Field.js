import React from 'react';
import './Field.scss';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/Input/Input';

const Field = ({ disabled, ...props }) => (
	<div className='field'> 
    <Label>{props.label}</Label>
    <Input 
      className = '--login'
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