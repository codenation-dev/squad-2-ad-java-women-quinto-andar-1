import React from 'react';
import './OptionsList.scss';
export const OptionsList = (props) => {
 
    return(
        <div className='options'>
            <div className='options-buttons'>
                {props.children}
            </div>
            <div className='options-icons'></div>
        </div>
    )
}