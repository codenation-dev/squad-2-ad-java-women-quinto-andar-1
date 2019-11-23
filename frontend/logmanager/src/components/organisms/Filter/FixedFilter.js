import React, {useState, useEffect} from 'react';
import './Filter.scss';
import Input from '../../atoms/Input/Input';
import { Search } from 'react-feather';
import Select from 'react-select'

const optionsEnviroment = [
    { value: 'PROD', label: 'Produção' },
    { value: 'DEV', label: 'Dev' },
    { value: 'HOMOL', label: 'Homologação' }
]
const optionsOrder = [
    { value: undefined, label: 'Ordenar' },
    { value: 'level', label: 'Level' },
    { value: 'frequency', label: 'Frequência' }
]
const optionsFind = [
    { value: undefined, label: 'Buscar' },
    { value: 'level', label: 'Level' },
    { value: 'description', label: 'Descrição' },
    { value: 'origin', label: 'Origem' }
]

export const FixedFilter = (props) => {

    const [environment, setEnviroment] = useState(optionsEnviroment[0])
    const [order, setOrder] = useState()
    const [find, setFind] = useState()
    const [search, setSearch] = useState('')
    const [timer, setTimer] = useState()
    const TIMEOUT = 2000

    useEffect(()=>{
        props.onSearch({environment, order, find, search})
    },[environment, order, find])

    useEffect(()=>{
        resetTimer()
    },[search])

    const resetTimer = () =>{
        clearTimeout(timer)
        if(!search) setFind(undefined)
        setTimer(setTimeout(()=>{
            onSearch({environment, order, find, search})
        },TIMEOUT))
    }

    const onSearch = filters => {
        props.onSearch(filters)
    }

    return(
        <div className='filter'>
            <div className='filter-selects'>
                <Select className='filter-selects-select _env' onChange={value => setEnviroment(value)} value={environment} placeholder={optionsEnviroment[0].label} defaultValue = {optionsEnviroment[0].value} options={optionsEnviroment} />
                <Select className='filter-selects-select _order' onChange={value => setOrder(value)} value={order} placeholder={optionsOrder[0].label} defaultValue = {optionsOrder[0].value} options={optionsOrder} />
                <Select className='filter-selects-select _find' onChange={value => setFind(value)} value={find} placeholder= {optionsFind[0].label} defaultValue = {optionsFind[0].value} options={optionsFind} />
            </div>
            <div className= 'filter-search'>
                <Search />
                <Input
                    className = '--search'
                    name={'search'}
                    type={'search'}
                    onChange={value => setSearch(value.target.value)}
                    value={search}
                    placeholder='Digite sua pesquisa aqui'
                />
            </div>
        </div>
    )
}