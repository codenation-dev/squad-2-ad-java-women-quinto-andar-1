import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LogDetail extends Component {  
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
          <p>Página de Detalhe do Log: {this.props.match.params.id}</p>
        </div>
        <div>
          <Link to="/logs">
            <p>Voltar</p>
          </Link>
        </div>
      </>
    );
  }
}

export default LogDetail;