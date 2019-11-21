import React, {useState, useEffect} from 'react'
import './logContainer.scss'

export const LogContainer = (props) => {
    return(
        <div className='log-container'>
            <h1 className={props.level}>{props.level}</h1>
            <h1>{props.title}</h1>
        </div>
    )
}