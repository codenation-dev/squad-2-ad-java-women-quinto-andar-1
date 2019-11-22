import React from 'react';
import './Button.scss';

const Button = ({ disabled, children, ...props }) => (
	<button {...props} className={disabled ? "button disabled " : "button " + props.className}>
		{children}
	</button>
);

export default Button;