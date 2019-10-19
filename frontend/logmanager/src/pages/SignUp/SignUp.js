import React, { Component } from 'react';
import { Link } from "react-router-dom";

class SignUp extends Component {
  render() {
    return (
      <>
        <div>
          <p>Página de Cadastro</p>
        </div>
        <div>
          <Link to="/login">
            <button>Voltar</button>
          </Link>
        </div>
      </>
    );
  }
}

export default SignUp;