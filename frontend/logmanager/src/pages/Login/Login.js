import React, { Component } from 'react';
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
  apiCall = (request) => {
    // Temporary mock:
    const { email, password } = request.params;

    if (email === 'teste' && password === '1234') {
      return {
        statusCode: 200,
        userName: 'Fulano',
        token: '424242',
      };
    } else if (email === 'teste' && password !== '1234') {
      return {
        statusCode: 401,
        message: 'Senha incorreta',
      };
    } else  {
      return {
        statusCode: 400,
        message: 'Usuário não cadastrado',
      };
    }
  }

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

      // TODO: mover para o UserService
      const apiResponse = await this.apiCall({
        path: '/login',
        method: 'POST',
        params: {
          email,
          password,
        }
      });
        
      if (apiResponse.token) {
        this.setCookie(apiResponse.token);
        history.push('/logs');
      } 
  
      if (apiResponse.statusCode === 401) {
        alert('Senha incorreta!');
        this.setState({ password: '' });
      }
  
      if (apiResponse.statusCode === 400) {
        alert('Usuário não cadastrado!');
        this.resetFields();
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

  // TODO: migrar a criação de cookies para o backend (mais seguro)
  setCookie = (token) => {
    const expirationDate = new Date();
    const time = expirationDate.getTime();
    // Cookie com 10s de tempo de expiração para testes
    const expireTime = time + 1000*10;
    expirationDate.setTime(expireTime);

    document.cookie = `userToken=${token};expires=${expirationDate.toUTCString()}`
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