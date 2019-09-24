import React from 'react';
import './Icon.css';

const Icon = ({icon, ...props}) => (
	<div className={icon} {...props} />
);

export default Icon;