import React, { Component } from 'react';
import './Login.css';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';
import { RequestService } from '../../services/RequestService';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  alterState = (response) =>{
    console.log(response)
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

      const response = RequestService.login(body, this.alterState);
      sessionStorage.setItem("authToken", response.headers["authorization"]);

      history.push('/logs');
    } catch (e) {
      console.log(e)
      //alert(e.message);
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
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.handleInputChange}
          email={this.state.email}
          password={this.state.password}
        />
    );
  }
}

export default Login;