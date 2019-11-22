import React, { Component } from 'react';

class Error500 extends Component {
  render() {
    return (
      <div className="container-error">
        <div class="container-box-error">
        <p className="error-code">500</p>
        <p class="error-menssage">Erro interno<br></br>Tente novamente mais tarde</p>
        </div>
      </div>
    );
  }
}

export default Error500;