import React from 'react';
import { Link } from "react-router-dom";
import './LoginForm.css';
import Card from '../../atoms/Card/Card';
import Form from '../../atoms/Form/Form';
import Field from '../../molecules/Field/Field';
import Button from '../../atoms/Button/Button';

const LoginForm = ({onSubmit, onChange, ...props}) => (
	<Card>
    <Form onSubmit={onSubmit}>
      <Field
        label="E-mail"
        name="email"
        type="text"
        onChange={onChange}
        value={props.email}
      />
      <Field
        label="Senha"
        name="password"
        type="password"
        onChange={onChange}
        value={props.password}
      />
      <Button>
        Logar
      </Button>
      <Link to='/sign-up'>
        <Button>
          Cadastrar
        </Button>
      </Link>
    </Form>
  </Card>
);

export default LoginForm;