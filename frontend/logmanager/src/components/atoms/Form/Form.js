import React from 'react';
import './Form.scss';

const Form = props => (
	<form className='form' onSubmit={props.onSubmit}>
		{props.children}
	</form>
);

export default Form;