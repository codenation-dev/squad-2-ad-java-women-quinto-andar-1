import React, { Component } from 'react';
import SignUpForm from '../../components/organisms/SignUpForm/SignUpForm';
import { RequestService } from '../../services/RequestService';
import './SignUp.css';
import Loader from '../../components/molecules/Loader/Loader';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    isLoading: false,
  }

  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  redirectToMainPage = () => {
    const authToken = sessionStorage.getItem("authToken");
    const { history } = this.props;

    if (authToken) {
      this.setState({
        isLoading: false
      })

      history.push('/logs');
    } else {
      this.redirectToMainPage();
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    try {
      this.validateFields(name, email, password);

      this.setState({
        isLoading: true
      })

      const body = {
        name,
        email, 
        password
      };

      const response = await RequestService.signUp(body);
      sessionStorage.setItem("authToken", response.headers["authorization"]);

      this.redirectToMainPage()
    } catch (e) {
      console.log(e);

      this.setState({
        isLoading: false
      })
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
      <>
        {this.state.isLoading && <Loader />}
        <SignUpForm
          onSubmit={this.onSubmit}
          onChange={this.handleInputChange}
          email={this.state.email}
          password={this.state.password}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}

export default SignUp;