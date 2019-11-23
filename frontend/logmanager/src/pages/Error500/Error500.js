import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '../../components/atoms/Button/Button';

class Error500 extends Component {
  render() {
    return (
      <div className="container-error">
        <div class="container-box-error">
          <p className="error-code">500</p>
          <p class="error-menssage">Erro interno<br></br>Tente novamente mais tarde</p>
          <Link to="/logs">
            <Button className="button --white">Voltar à página principal</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Error500;