import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../components/molecules/Loader/Loader';
import { RequestService } from '../../services/RequestService';

class LogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
    }
  }

  componentDidMount = async () => {
    try {
      const logId = this.props.match.params.id

      const response = await RequestService.getLogById(logId);
      
      // TODO: gravar a resposta no state

      this.setState({
        isAuthenticated: true,
      })
    } catch (e) {
      this.props.history.replace('/login')
    }
  }

  render() {
    return this.state.isAuthenticated
      ? <>
          <div>
            <p>Página de Detalhe do Log: {this.props.match.params.id}</p>
          </div>
          <div>
            <Link to="/logs">
              <p>Voltar</p>
            </Link>
          </div>
        </>
      : <Loader />
  }
}

export default LogDetail;