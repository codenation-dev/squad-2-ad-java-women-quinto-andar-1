// import './Menu.scss';
// import React, { Component } from 'react';
// import Button from '../../atoms/Button/Button';
// import { withRouter } from 'react-router-dom';

// class Menu extends Component {
//   logOut = () => {
//     sessionStorage.removeItem("authToken");
//     this.props.history.push('/')
//   }
  
//   render() {
//     const { pathname } = this.props.location
//     const hiddenMenuPages = ['/', '/login', '/sign-up']

//     return !hiddenMenuPages.includes(pathname)
//       ? <>
//           {this.props.children}
//         </>
//       : <>
//           {this.props.children}
//         </>
//   }
// }

// export default withRouter(Menu);