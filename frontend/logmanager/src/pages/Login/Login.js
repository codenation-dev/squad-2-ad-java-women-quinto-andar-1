import React, { Component } from 'react';
import './Login.css';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';
import { RequestService } from '../../services/RequestService';
import Loader from '../../components/molecules/Loader/Loader';
import { userNotification } from '../../errors/UserNotifications';
import { WrongPassword, EmptyFields, EmptyField, InvalidEmail, UserNotFound, DefaultError, InternalServerError } from '../../errors/WepAppErrors';

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

  // redirectToMainPage = () => {
  //   const authToken = sessionStorage.getItem("authToken");
  //   const { history } = this.props;

  //   if (authToken) {
  //     this.setState({
  //       isLoading: false
  //     })

  //     history.push('/logs');
  //   } else {
  //     this.redirectToMainPage();
  //   }
  // }

  onSubmit = async (e) => {
    try {
      e.preventDefault();

      const { history } = this.props;
      const { email, password } = this.state;
  
      this.validateFields(email, password);

      this.setState({
        isLoading: true
      });

      const body = {
        email, 
        password
      };

      const response = await RequestService.login(body);

      if (response) {
        this.validateResponse(response);

        sessionStorage.setItem("name", response.data["name"]);
        sessionStorage.setItem("tokenAccess", response.data["tokenAccess"]);
        sessionStorage.setItem("authToken", response.headers["authorization"]);
  
        // talvez não precise do redirectToMain
        // this.redirectToMainPage();
        this.setState({
          isLoading: false
        })
  
        history.push('/logs');
      }
    } catch (e) {
      userNotification.notifyError(e.message);

      this.setState({
        isLoading: false,
      });
    }
  }

  resetFields = () => {
    this.setState({
      email: '',
      password: '',
    });
  }

  validateFields = (email, password) => {
    if (!email && !password) {
      throw new EmptyFields('Os campos estão vazios!');
    }

    if (!email) {
      throw new EmptyField('e-mail');
    }
    
    if (!password) {
      throw new EmptyField('senha');
    }

    if (!email.includes('@') || !email.includes('.')) {
      throw new InvalidEmail('E-mail inválido');
    }
  }

  validateResponse = (response) => {
    if (response.error === 'ERROR_USER_VALIDATE_PWD') {
      throw new WrongPassword(response.message);
    }

    if (response.error === 'ERROR_USER_FIND') {
      throw new UserNotFound(response.message);
    }

    if (response.status === 400) {
      throw new DefaultError(response.message);
    }

    if (response.status === 500) {
      throw new InternalServerError();
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