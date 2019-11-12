import React, { Component } from 'react';
import SignUpForm from '../../components/organisms/SignUpForm/SignUpForm';
import { RequestService } from '../../services/RequestService';
import './SignUp.css';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { history } = this.props;

    try {
      this.validateFields(name, email, password);

      const body = {
        name,
        email, 
        password
      };

      const response = await RequestService.signUp(body);
      sessionStorage.setItem("authToken", response.headers["authorization"]);

      this.resetFields();
      history.push('/logs');
    } catch (e) {
      alert(e.message);
    }
  }

  resetFields = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    })
  }

  validateFields = (name, email, password) => {
    // TODO criar erros de validação padrão de front em outro arquivo
    if (!name) {
      throw new Error('Preencha o nome');
    }

    if (!email) {
      throw new Error('Preencha o email');
    }
    
    if (!password) {
      throw new Error('Preencha a senha');
    }

    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Email inválido');
    }
  }

  render() {
    return (
      <div className="container-principal">
      <div className="content">
        <SignUpForm
          onSubmit={this.onSubmit}
          onChange={this.handleInputChange}
          email={this.state.email}
          password={this.state.password}
        />
      </div>
      </div>
    );
  }
}

export default SignUp;