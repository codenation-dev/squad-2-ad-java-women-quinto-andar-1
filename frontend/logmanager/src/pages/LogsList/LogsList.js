import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { RequestService } from '../../services/RequestService';
import Loader from '../../components/molecules/Loader/Loader';
import Button from '../../components/atoms/Button/Button';
import Input from '../../components/atoms/Input/Input';
import { FixedFilter } from '../../components/organisms/Filter/FixedFilter';
import { LogContainer } from '../../components/molecules/logContainer/logContainer';
import { OptionsList } from '../../components/organisms/OptionsList/OptionsList';
import './LogsList.scss';
import { NoLogSelected, ExpiredUserToken } from '../../errors/WepAppErrors';
import { userNotification } from '../../errors/UserNotifications';

class LogsList extends Component {
  state = {
    isLoading: false,
    environment: 'PROD',
    frequency: false,
    logs: []
  }

  // componentDidMount = async (props) => {
  //   try {
  //     const response = await RequestService.getLogsByEnvironment('dev');

  //     if (response.data) {
  //       const logs = response.data.map(log => ({
  //         ...log,
  //         isChecked: false
  //       }))
    
  //       this.setState({
  //         isLoading: false,
  //         logs
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // this.props.history.replace('/login');
  //   }
  // }

  handleCheckBox = (e) => {
    console.log('ENTROU NO HANDLE')
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
  changeStatus = async (e, status) => {
    try {
      e.preventDefault()

      const logsIds = this.state.logs.filter(log => log.isChecked)
        .map(log => log.id)
      
      if (!logsIds.length) {
        throw new NoLogSelected()
      }
  
      const body = {
        ids: logsIds,
        status,
      }

      await RequestService.changeStatus(body);
      const updatedLogs = await RequestService.getLogsByEnvironment(this.state.environment)
  
      if (updatedLogs.data) {
        this.setState({
          logs: updatedLogs.data,
        })
      }
    } catch (error) {
      if (error.name === 'NoLogSelected') {
        userNotification.notifyError(error.message)
      }
    }
  }

  isSomethingInValueUndefined = (value) => {
    return !(value != undefined && value.value != undefined)
  }

  isOrderUndefined = (value) => {
    return this.isSomethingInValueUndefined(value.order)
  }
  isFindUndefined = (value) => {
    return this.isSomethingInValueUndefined(value.find)
	}
	
	alterState = (response) => {
		const logs = response.data.map(log => ({
			...log,
			isChecked: false
		}))

		this.setState({ logs, isLoading: false})
	}

  handleResponse = (response) =>{
    try {
      if (response.error === 'Token Expirado') {
				throw new ExpiredUserToken();
      }
  
      this.alterState(response)
    } catch (error) {
			if (error.name === 'ExpiredUserToken') {
				userNotification.notifyError(error.message)
				this.props.history.replace('/login');
			}
    }
  }

  async handleOnSearch(value) {
    
    this.setState({
      environment: value.environment.value,
      frequency: false
    })
    console.log(this.state)
    console.log(value)
    if (value.search == undefined) value.search = ''
		
		let response
    if (this.isOrderUndefined(value) && this.isFindUndefined(value) && value.search == '') {
      response = await RequestService.getLogsByEnvironment(value.environment.value)
    } else if (value.find == undefined && value.search == '') {
      this.setState({
				frequency: true
			})
			
			response = await RequestService.orderLogs(value.environment.value, value.order.value)
    } else if (value.find == undefined && value.search != '') {
			response = await RequestService.searchLogs(value.environment.value, 'description', value.search);
    } else {
      response = await RequestService.searchLogs(value.environment.value, value.find.value, value.search);
		}
		
		this.handleResponse(response)
  }

  render() {
    const { logs } = this.state

    return this.state.isLoading
      ? <Loader />
      : (
        <>
          <FixedFilter onSearch={value => this.handleOnSearch(value)} />
          <OptionsList onClickedStatus={(e) => this.changeStatus(e, e.value)}>
          <Button className='--change' type='button' onClick={(e) => this.changeStatus(e, 'FILED')} alt='Clique para arquivar'>
                    Arquivar
                </Button>
                <Button className='--change' type='button' onClick={(e) => this.changeStatus(e, 'DELETE')} alt='Clique para deletar'>
                    deletar
                </Button>
          </OptionsList>
          <ul className='logContainer-ul'>
            {logs && logs.map(log => 
                <div key={'log' +log.id} className='log-container'>
                  <div className='left'>
                      <Input className='--checkbox' id={log.id} type='checkbox' onChange={this.handleCheckBox} />
                    <p className={'log-container-level ' + log.level}>{log.level}</p>
                  </div>
                  <div className='log-container-infos'>
                      <p>{log.title}</p>
                      <p>{log.origin}</p>
                      <p>{log.event_date}</p>
                  </div>
                  {this.state.frequency ? <p className='log-container-frequency'>{log.frequency}</p> : <div><Link to={`/logs/${log.id}`}><p >Detalhes</p></Link></div>}
                  
              </div>
            )}
          </ul>
        </>
      )
  }
}

export default LogsList