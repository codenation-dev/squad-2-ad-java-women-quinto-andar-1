import React from 'react';
import './Button.css';

const Button = ({ children, ...props }) => (
	<button {...props}>
		{children}
	</button>
);

export default Button;