import React from 'react';
import './Label.css';

const Label = ({ children, ...props }) => (
	<label {...props}>
		{children}
	</label>
);

export default Label;