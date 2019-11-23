import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../components/molecules/Loader/Loader';
import { RequestService } from '../../services/RequestService';
import './LogDetail.scss';


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
      
      this.setState({
        isAuthenticated: true,
        log: response.data
      })
    } catch (e) {
      // this.props.history.replace('/login')
    }
  }

  render() {
    const { log } = this.state

    return this.state.isAuthenticated
      ? <div className="container-detail" key={log.id} id={log.id}>
        <div className="bottom-link-wrapper">
          <Link 
            to="/logs"
            className="--change"
            role="button"
            >Voltar</Link>
            
          </div>
        <div className="container-detail-box">
          <div className="">
            <p className="title-detail">Erro no {log.origin} em {log.event_date}</p>
            <p className="container-detail-subtitle">Título <br></br>{log.title}</p>
            <p className="container-detail-subtitle">Detalhes <br></br></p>
            <p>Descrição: {log.description}</p>
            <p>Origem: {log.origin}</p>
            <p>Ambiente: {log.environment}</p>
            <p>Data do evento: {log.event_date}</p>
            <p>Status: {log.status}</p>

            <div className="detail-right">
            <p>{log.level}</p>
            <p className="container-detail-subtitle">Coletado por: <br></br> {sessionStorage.getItem("tokenAccess")}</p>
          </div>
          </div>
          
        </div>
        </div>
      : <Loader />
  }
}

export default LogDetail;