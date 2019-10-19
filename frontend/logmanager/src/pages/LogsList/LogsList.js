import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LogsList extends Component {
  componentDidMount = () => {
    // TODO: substituir pela checkagem de token de autenticação na resposta da request à API;
    const isAuthenticated = document.cookie.includes('userToken');
    const { history } = this.props;

    if (!isAuthenticated) {
      history.replace('/login');
    }
  }

  render() {
    return (
      <>
        <div>
          <p>Olá!</p>
        </div>
        <div>
          <p>Página de Logs</p>
          <Link to="/logs/001">
            <p>Primeiro Log</p>
          </Link>
          <Link to="/logs/002">
            <p>Segundo Log</p>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <button>Sair</button>
          </Link>
        </div>
      </>
    );
  }
}

export default LogsList;