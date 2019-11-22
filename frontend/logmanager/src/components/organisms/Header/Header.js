import React, { Component } from 'react';
import './Header.scss';
import { LogOut } from 'react-feather';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    logOut = () => {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("tokenAccess");
        sessionStorage.removeItem("authToken");
        this.props.history.push('/')
    }
    render() {
        const { pathname } = this.props.location
        const hiddenHeaderPages = ['/', '/login', '/sign-up']

        return !hiddenHeaderPages.includes(pathname)
            ? <>
                <header className='header'>
                    <div className='header-left'>
                        <h1>Olá, <span>{sessionStorage.getItem("name")}</span></h1>
                        <h2>{sessionStorage.getItem("tokenAccess")}</h2>
                    </div>
                    <div className='header-right' onClick={this.logOut}>
                        <LogOut />
                    </div>
                </header>
                {this.props.children}
            </>
            : <>
                {this.props.children}
            </>
    }
}
export default withRouter(Header);