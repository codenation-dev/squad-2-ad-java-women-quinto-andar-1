import React, {useState, useEffect} from 'react'
import './logContainer.scss'

export const LogContainer = (props) => {
    return(
        <div className='log-container'>
            <p className={'log-container-level ' + props.level}>{props.level}</p>
            <div className='log-container-infos'>
                <p>{props.title}</p>
                <p>{props.origin}</p>
                <p>{props.event_date}</p>
            </div>
            <p className='log-container-frequency'></p>
        </div>
    )
}