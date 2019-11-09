import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  // TODO: garantir que um usuário que tenha um cookie válido não precise se autenticar de novo
  // (detectar o Cookie no componentDidMount e, se houver, redirecionar para a página de logs)

  // TODO: criar método genérico base que faça requests para a API no BaseService

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    try {
      this.validateFields(email, password);

      const body = {
        email, 
        password
      };

      const response = await axios.post('http://localhost:8080/user/login', body)        
      sessionStorage.setItem("authToken", response.headers["authorization"]);

      if (response.status === 200) {
        history.push('/logs');
      }      
    } catch (e) {
      alert(e.message);
    }
  }

  resetFields = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

  validateFields = (email, password) => {
    // TODO criar erros de validação padrão de front em outro arquivo
    if (!email && !password) {
      throw new Error('Os campos estão vazios!');
    }

    if (!email) {
      throw new Error('Preencha o email');
    }
    
    if (!password) {
      throw new Error('Preencha a senha');
    }
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.handleInputChange}
          email={this.state.email}
          password={this.state.password}
        />
      </div>
    );
  }
}

export default Login;