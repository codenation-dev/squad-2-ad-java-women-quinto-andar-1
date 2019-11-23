import React from 'react';
import './Label.scss';

const Label = ({ children, ...props }) => (
	<label {...props} className='label'>
		{children}
	</label>
);

export default Label;