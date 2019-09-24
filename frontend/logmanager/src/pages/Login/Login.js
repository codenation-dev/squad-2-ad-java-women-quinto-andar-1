import React, { Component } from 'react';
import './Login.css';
import LoginForm from '../../components/organisms/LoginForm/LoginForm';

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

  onSubmit = (e) => {
    e.preventDefault();

    // TODO: call API login endpoint 

    // Temporary placeholder
    const {email, password} = this.state;
    if (email === 'teste' && parseInt(password) === 1234) {
      alert('Logado com sucesso!');
    } else if (email === 'teste' && parseInt(password) !== 1234) {
      alert('Senha incorreta =(!');
    } else  {
      alert('E-mail não cadastrado!');
    }

    this.resetFields();
  }

  resetFields = () => {
    this.setState({
      email: '',
      password: '',
    })
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