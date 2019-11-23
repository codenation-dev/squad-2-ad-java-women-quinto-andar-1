import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../components/molecules/Loader/Loader';
import { RequestService } from '../../services/RequestService';
import { NotFoundPage, LogNotFound, InternalServerError, ExpiredUserToken } from '../../errors/WepAppErrors';
import { userNotification } from '../../errors/UserNotifications';

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

      this.validateResponse(response);
      
      this.setState({
        isAuthenticated: true,
        log: response.data
      })
    } catch (e) {
      if (e.name === 'LogNotFound' || e.name === 'InternalServerError') {
        userNotification.notifyError(e.message);
        this.props.history.replace('/logs');
      }

      if (e.name === 'NotFoundPage') {
        this.props.history.replace('/error404');
      }

			if (e.name === 'ExpiredUserToken') {
				userNotification.notifyError(e.message)
				this.props.history.replace('/login');
			}
    }
  }

  validateResponse = (response) => {
    if (response.error === 'ERROR_LOG_FIND') {
      throw new LogNotFound(response.message);
    }

    if (response.error.includes('Failed to convert')) {
      throw new NotFoundPage('Página não encontrada');
    }

    if (response.status === 500) {
      throw new InternalServerError();
    }

    if (response.error === 'Token Expirado') {
      throw new ExpiredUserToken();
    }
  }

  render() {
    const { log } = this.state

    return this.state.isAuthenticated
      ? <div key={log.id} id={log.id}>
          <div>
            <p>Título: {log.title}</p>
          </div>
          <div>
            <p>Descrição: {log.description}</p>
            <p>Origem: {log.origin}</p>
            <p>Ambiente: {log.environment}</p>
            <p>Data do evento: {log.event_date}</p>
            <p>Coletado por: {log.user_id}</p>
          </div>
          <div>
            <p>Nível: {log.level}</p>
            <p>Status: {log.status}</p>
          </div>
          <div>
            <Link to="/logs">
              <p>Voltar</p>
            </Link>
          </div>
        </div>
      : <Loader />
  }
}

export default LogDetail;