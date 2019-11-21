import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../components/molecules/Loader/Loader';
import { RequestService } from '../../services/RequestService';
import './LogsList.css';

class LogsList extends Component {
  state = {
    isLoading: true,
    environment: 'dev',
    orderBy: 'default',
    searchBy: 'default',
    query: '',
    logs: []
  }

  componentDidMount = async (props) => {
    try {
      const response = await RequestService.getLogsByEnvironment('dev');

      if (response.data) {
        const logs = response.data.map(log => ({
          ...log,
          isChecked: false
        }))
    
        this.setState({
          isLoading: false,
          logs
        });
      }
    } catch (e) {
      console.log(e);
      // this.props.history.replace('/login');
    }
  }

  changeEnvironment = async (e) => {
    this.setState({
      environment: e.target.value,
      orderBy: 'default',
      searchBy: 'default',
      query: '',
      isLoading: true
    })

    const response = await RequestService.getLogsByEnvironment(e.target.value);

    this.setState({
      logs: response.data,
      isLoading: false
    })
  }

  orderLogsBy = async (e) => {
    this.setState({
      orderBy: e.target.value,
      searchBy: 'default',
      query: '',
      isLoading: true
    })

    const response = await RequestService.orderLogs(this.state.environment, e.target.value);

    this.setState({
      logs: response.data,
      isLoading: false
    })
  }

  searchBy = (e) => {
    this.setState({
      searchBy: e.target.value,
      orderBy: 'default',
    })
  }

  handleQuery = (e) => {
    this.setState({
      query: e.target.value,
    })
  }

  handleCheckBox = (e) => {
    const logs = [...this.state.logs]
    logs.forEach(log => {
      if (log.id === parseInt(e.target.id, 10)) {
        log.isChecked = e.target.checked
      }
    })

    this.setState({
      logs,
    })
  }

  searchLogs = async (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true
    })

    const { environment, searchBy, query } = this.state;

    if (searchBy === 'default') {
      return alert('Selecione o método de busca!');
    }

    const response = await RequestService.searchLogs(environment, searchBy, query);
    this.setState({
      logs: response.data,
      isLoading: false
    })
  }

  changeStatus = async (e, status) => {
    e.preventDefault();

    const logsIds = this.state.logs.filter(log => log.isChecked)
      .map(log => log.id)

    const body = {
      ids: logsIds,
      status,
    }

    await RequestService.changeStatus(body)
    const updatedLogs = await RequestService.getLogsByEnvironment(this.state.environment)

    if (updatedLogs.data) {
      this.setState({
        logs: updatedLogs.data
      })
    }
  }

  renderSubMenu = () => (
    <>
      <div className='d-flex j-around'>
        <div>
          <select onChange={this.changeEnvironment} value={this.state.environment}>
            <option value='prod'>Produção</option>
            <option value='homol'>Homologação</option>
            <option value='dev'>Dev</option>
          </select>
        </div>
        <div>
          <select onChange={this.orderLogsBy} value={this.state.orderBy}>
            <option value='default'>Ordenar por</option>
            <option value='level'>Level</option>
            <option value='frequency'>Frequência</option>
          </select>
        </div>
        <div>
          <form onSubmit={this.searchLogs}>
            <select onChange={this.searchBy} value={this.state.searchBy}>
              <option value='default'>Buscar por</option>
              <option value='level'>Level</option>
              <option value='description'>Descrição</option>
              <option value='origin'>Origem</option>
            </select>
            <input type='text' value={this.state.query} onChange={this.handleQuery} />
          </form>
        </div>
      </div>
    </>
  )

  renderLogList = (logs) => (
    <div className='d-flex fd-col'>
      <div className='d-flex' style={{marginTop: 10}}>
        <button onClick={(e) => this.changeStatus(e, 'FILED')}>Arquivar</button>
        <button onClick={(e) => this.changeStatus(e, 'DELETE')}>Apagar</button>
      </div>
      <div className='d-flex j-around'>
        <p>Selecionar</p>
        <p>Nível</p>
        <p>Título</p>
        <p>Status</p>
        <p>Ocorrências</p>
        <p>Detalhes</p>
      </div>
      { logs.map(log => (
          <div key={log.id} className='d-flex j-around'>
            <input id={log.id} type='checkbox' onChange={this.handleCheckBox} />
            <div>
              <p style={{color: 'blue'}}>{log.level}</p>
            </div>
            <div>
              <p>{log.title}</p>
              <p>Origem: {log.origin}</p>
              <p>Data: {log.event_date}</p>
            </div>
            <div>
              <p style={{color: 'blue'}}>{log.status}</p>
            </div>
            <div>
              <p>{log.frequency || 1}</p>
            </div>
            <div>
              <Link to={`/logs/${log.id}`}>
                <p>Detalhes</p>
              </Link>
            </div>
          </div>
        ))  
      }
    </div>
  )

  render() {
    const { logs } = this.state

    return this.state.isLoading
      ? <Loader />
      : (
        <>
          { this.renderSubMenu()}
          { logs.length 
            ? this.renderLogList(logs)
            : <p>Nenhum log</p>
          }
        </>
      )
  }
}

export default LogsList;