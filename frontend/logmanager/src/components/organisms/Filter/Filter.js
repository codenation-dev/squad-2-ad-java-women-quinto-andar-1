import React, {useState, useEffect} from 'react';
import './Filter.scss';
import Select from 'react-select';
import Input from '../../atoms/Input/Input';
import { Search } from 'react-feather';

const Filter = ({filters}) => {

    const [selects, setSelects] = useState({})
    const [search, setSearch] = useState('')
    const [timer, setTimer] = useState()
    const TIMEOUT = 3000

    useEffect(()=>{
        console.log(selects)
    },[selects])

    useEffect(()=>{
        resetTimer()
    },[])

    const resetTimer = () =>{
        clearTimeout(timer)
        if(!search) return
        setTimer(setTimeout(()=>{
            onSearch({enviroment, order, find, search})
        },TIMEOUT))
    }

    const onSearch = filters => {
        console.log(filters)
    }

    const handleSelectsChange = (value, id) => {
        const newSelects = selects
        newSelects[id] = value
        setSelects(newSelects)
    }

    return(
        <div className='filter'>
            {filters && filters.map((filter, idx) => 
                <Select key={idx} className='filter-select' onChange={value => handleSelectsChange(value, filter.id)} value={selects[filter.id]} placeholder={filter.placeholder} id={filter.id} options={filter.options} />
            )}
            <div>
                <Input
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


export default Filter;