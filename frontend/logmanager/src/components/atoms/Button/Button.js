import React from 'react';
import './Button.css';

const Button = ({ disabled, children, ...props }) => (
	<button className={disabled ? "btn disabled" : "btn"} {...props}>
		{children}
	</button>
);

export default Button;