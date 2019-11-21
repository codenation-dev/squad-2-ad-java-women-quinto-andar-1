import React from 'react';
import './Header.scss';
import { User } from 'react-feather';
import Menu from '../Menu/Menu';

const Header = (props) => (
    <header className='header'>
        <div className='header-left'>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
        <div className='header-right'>
            <User />
            <Menu />
        </div>
    </header>
);

export default Header;