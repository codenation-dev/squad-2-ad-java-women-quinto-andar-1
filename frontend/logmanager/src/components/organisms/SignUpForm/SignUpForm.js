import React from 'react';
import { Link } from "react-router-dom";
import './SignUpForm.css';
import Card from '../../atoms/Card/Card';
import Form from '../../atoms/Form/Form';
import Field from '../../molecules/Field/Field';
import Button from '../../atoms/Button/Button';
import FormLink from '../../atoms/FormLink/FormLink';

const SignUpForm = ({onSubmit, onChange, ...props}) => (
	<Card>
    <Form onSubmit={onSubmit}>
      <Field
        label="Nome"
        name="name"
        type="text"
        onChange={onChange}
        value={props.name}
      />
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
        Cadastrar
      </Button>
      <FormLink> 
      <Link to='/login'>Voltar</Link>
      </FormLink> 
    </Form>
  </Card>
);

export default SignUpForm;
