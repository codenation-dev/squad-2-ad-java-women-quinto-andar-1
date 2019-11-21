import React from 'react';
import './LoginForm.css';
import Card from '../../atoms/Card/Card';
import Form from '../../atoms/Form/Form';
import Field from '../../molecules/Field/Field';
import Button from '../../atoms/Button/Button';
import FormLink from '../../atoms/FormLink/FormLink';

const LoginForm = ({onSubmit, onChange, isLoading, ...props}) => (
	<Card>
    <Form onSubmit={onSubmit}>
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
      <Button disabled={isLoading}>
        Logar
      </Button>
      <div className='bottom-link-wrapper'>
        <p className='mr-10'>Chegou agora?</p>
        <FormLink route='/sign-up' isDisabled={isLoading}>
          Cadastre-se
        </FormLink>
      </div>
    </Form>
  </Card>
);

export default LoginForm;