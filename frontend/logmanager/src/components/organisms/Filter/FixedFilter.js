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
    { value: undefined, label: 'Ordenar por' },
    { value: 'level', label: 'Level' },
    { value: 'frequency', label: 'Frequência' }
]
const optionsFind = [
    { value: undefined, label: 'Buscar por' },
    { value: 'level', label: 'Level' },
    { value: 'description', label: 'Descrição' },
    { value: 'origin', label: 'Origem' }
]


export const FixedFilter = (props) => {

    const [enviroment, setEnviroment] = useState(optionsEnviroment[0])
    const [order, setOrder] = useState()
    const [find, setFind] = useState()
    const [search, setSearch] = useState('')
    const [timer, setTimer] = useState()
    const TIMEOUT = 3000

    useEffect(()=>{
        props.onSearch({enviroment, order, find, search})
    },[enviroment, order, find])

    useEffect(()=>{
        resetTimer()
    },[search])

    const resetTimer = () =>{
        clearTimeout(timer)
        if(!search) return
        setTimer(setTimeout(()=>{
            onSearch({enviroment, order, find, search})
        },TIMEOUT))
    }

    const onSearch = filters => {
        props.onSearch(filters)
    }

    return(
        <div className='filter'>

            <Select className='filter-select _env' onChange={value => setEnviroment(value)} value={enviroment} placeholder={optionsEnviroment[0].label} defaultValue = {optionsEnviroment[0].value} options={optionsEnviroment} />
            <Select className='filter-select _order' onChange={value => setOrder(value)} value={order} placeholder={optionsOrder[0].label} defaultValue = {optionsOrder[0].value} options={optionsOrder} />
            <Select className='filter-select _find' onChange={value => setFind(value)} value={find} placeholder= {optionsFind[0].label} defaultValue = {optionsFind[0].value} options={optionsFind} />

            <div className= 'filter-search'>
                <Search />
                <Input
                    className = 'input -search'
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