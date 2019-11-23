import React, { Component } from 'react';
import SignUpForm from '../../components/organisms/SignUpForm/SignUpForm';
import { RequestService } from '../../services/RequestService';
import './SignUp.css';
import Loader from '../../components/molecules/Loader/Loader';
import { EmptyField, InvalidEmail, EmptyFields, UserAlreadyExists, DefaultError, InternalServerError } from '../../errors/WepAppErrors';
import { userNotification } from '../../errors/UserNotifications';

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
      const { name, email, password } = this.state;

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

      if (response.error === 'ERROR_USER_EMAIL_EXISTS') {
        throw new UserAlreadyExists(response.message);
      }

      if (response.status === 400) {
        throw new DefaultError(response.message);
      }

      if (response.status === 500) {
        throw new InternalServerError();
      }

      sessionStorage.setItem("authToken", response.headers["authorization"]);

      // talvez não precise do redirectToMainPage
      // this.redirectToMainPage()

      this.setState({
        isLoading: false
      })

      history.push('/logs');
    } catch (e) {
      userNotification.notifyError(e.message)

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
    if (!name && !email && !password) {
      throw new EmptyFields('Os campos estão vazios!')
    }

    if (!name) {
      throw new EmptyField('nome');
    }

    if (!email) {
      throw new EmptyField('e-mail');
    } 
    
    if (!password) {
      throw new EmptyField('senha');
    }

    if (!email.includes('@') || !email.includes('.')) {
      throw new InvalidEmail('Email inválido');
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