import React from 'react';
import './SignUpForm.css';
import Card from '../../atoms/Card/Card';
import Form from '../../atoms/Form/Form';
import Field from '../../molecules/Field/Field';
import Button from '../../atoms/Button/Button';
import FormLink from '../../atoms/FormLink/FormLink';

const SignUpForm = ({onSubmit, onChange, isLoading, ...props}) => (
	<Card>
    <Form onSubmit={onSubmit}>
      <Field
        label="Nome"
        name="name"
        type="text"
        onChange={onChange}
        value={props.name}
        disabled={isLoading}
      />
      <Field
        label="E-mail"
        name="email"
        type="text"
        onChange={onChange}
        value={props.email}
        disabled={isLoading}
      />
      <Field
        label="Senha"
        name="password"
        type="password"
        onChange={onChange}
        value={props.password}
        disabled={isLoading}
      />
      <Button className='--form' disabled={isLoading}> 
        Cadastrar
      </Button>
      <div className='bottom-link-wrapper'>
        <FormLink route='/login' isDisabled={isLoading}>
          Voltar
        </FormLink>
      </div>
    </Form>
  </Card>
);

export default SignUpForm;
