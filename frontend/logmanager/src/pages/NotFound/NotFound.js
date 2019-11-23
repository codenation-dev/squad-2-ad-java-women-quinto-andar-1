import React, { Component } from 'react';
import './NotFound.scss';
import Button from '../../components/atoms/Button/Button';
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="container-error">
        <div class="container-box-error">
          <p className="error-code">404</p>
          <p class="error-menssage">Página não encontrada</p>
          <Link to="/logs">
            <Button className="button --white">Voltar à página principal</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;