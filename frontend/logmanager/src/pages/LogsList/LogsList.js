import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class LogsList extends Component {
  componentDidMount = async () => {
    await axios.get('http://localhost:8080/logs', {
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