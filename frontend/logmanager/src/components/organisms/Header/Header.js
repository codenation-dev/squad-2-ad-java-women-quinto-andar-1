import React from 'react';
import './Header.scss';
import { User } from 'react-feather';

const Header = (props) => (
    <header className='header'>
        <div className='header-left'>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
        <div className='header-right'>
            <User />
        </div>
    </header>
);

export default Header;