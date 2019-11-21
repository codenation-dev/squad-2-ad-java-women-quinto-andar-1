import React from 'react';
import './Button.scss';

const Button = ({ children, ...props }) => (
	<button {...props} className={'button ' + props.className}>
		{children}
	</button>
);

export default Button;