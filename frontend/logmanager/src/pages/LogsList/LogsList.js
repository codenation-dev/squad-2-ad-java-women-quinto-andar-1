import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../components/molecules/Loader/Loader';
import { RequestService } from '../../services/RequestService';

class LogsList extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount = async (props) => {
    try {
      const response = await RequestService.listLogs();
  
      // TODO: gravar a resposta no state
      this.setState({
        isAuthenticated: true,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return this.state.isAuthenticated
      ? (
        <>
          <div>
            <p>Olá!</p>
          </div>
          <div>
            <p>Página de Logs</p>
            <Link to="/logs/1">
              <p>Primeiro Log</p>
            </Link>
            <Link to="/logs/2">
              <p>Segundo Log</p>
            </Link>
          </div>
        </>
      )
    : <Loader />
  }
}

export default LogsList;