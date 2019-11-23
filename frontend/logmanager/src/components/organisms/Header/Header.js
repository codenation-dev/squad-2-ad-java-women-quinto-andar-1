import React, { Component } from 'react';
import './Header.scss';
import { LogOut } from 'react-feather';
import { withRouter } from 'react-router-dom';
import Logo from '../../../static/images/sherlog-icon-white-bgd.png';

class Header extends Component {
	logOut = () => {
		sessionStorage.removeItem("name");
		sessionStorage.removeItem("tokenAccess");
		sessionStorage.removeItem("authToken");
		this.props.history.push('/')
	}
	render() {
		const { pathname } = this.props.location
		const visibleHeaderPage = '/logs'

		return pathname.includes(visibleHeaderPage)
			? <>
				<header className='header'>
					<div>
						<div className='left-side-wrapper'>
							<img src={Logo} className="logo-icon" />
							<div className='header-left'>
								<h1>Olá, <span>{sessionStorage.getItem("name")}</span></h1>
								<h2>Token: {sessionStorage.getItem("tokenAccess")}</h2>
							</div>
						</div>
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