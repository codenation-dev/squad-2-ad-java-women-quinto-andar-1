import React, { Component } from 'react';
import './Login.css';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';
import { RequestService } from '../../services/RequestService';
import Loader from '../../components/molecules/Loader/Loader';
import { userNotification } from '../../errors/UserNotification';

class Login extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
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

    const { email, password } = this.state;

    try {
      this.validateFields(email, password);
      this.setState({
        isLoading: true
      })

      const body = {
        email, 
        password
      };

      const response = await RequestService.login(body);

      if (response.status === 400) {
        userNotification.notifyError(response.message)
      }
      sessionStorage.setItem("name", response.data["name"])
      sessionStorage.setItem("tokenAccess", response.data["tokenAccess"])
      sessionStorage.setItem("authToken", response.headers["authorization"]);

      this.redirectToMainPage()
    } catch (e) {
      console.log('erro', e)

      this.setState({
        isLoading: false
      })
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
      <>
        {this.state.isLoading && <Loader />}
        <LoginForm
          onSubmit={this.onSubmit}
          onChange={this.handleInputChange}
          email={this.state.email}
          password={this.state.password}
          isLoading={this.state.isLoading}
        />
      </>
    )
  }
}

export default Login;