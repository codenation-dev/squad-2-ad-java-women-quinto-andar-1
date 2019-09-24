import React from 'react';
import './Form.css';

const Form = props => (
	<form onSubmit={props.onSubmit}>
		{props.children}
	</form>
);

export default Form;