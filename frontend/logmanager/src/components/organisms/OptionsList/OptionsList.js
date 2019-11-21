import React, {useState, useEffect} from 'react';
import './OptionsList.scss';
import Button from '../../atoms/Button/Button';
export const OptionsList = (props) => {

    return(
        <div className='options'>
            <div className='options-buttons'>
                <Button className='--change' type='button' placeholder='Clique para arquivar' value='filed'>
                    Arquivar
                </Button>
                <Button className='--change' type='button' name='delete' placeholder='Clique para deletar' value='deleted'>
                    deletar
                </Button>
            </div>
            <div className='options-icons'></div>
        </div>
    )
}