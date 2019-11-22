import React, { Component } from 'react';
import './NotFound.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="container-error">
        <div class="container-box-error">
        <p className="error-code">404</p>
        <p class="error-menssage">Conteúdo não encontrado</p>
        </div>
      </div>
    );
  }
}

export default NotFound;