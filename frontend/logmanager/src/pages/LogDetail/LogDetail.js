import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class LogDetail extends Component {  
  componentDidMount = async () => {
    await axios.get('http://localhost:8080/logs/teste', {
      headers: { Authorization: sessionStorage.getItem("authToken") },
    })
      .catch(e => {
        console.log(e);
        this.props.history.replace('/login');
      });
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