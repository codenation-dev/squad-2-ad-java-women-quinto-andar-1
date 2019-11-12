import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import LogsList from './pages/LogsList/LogsList';
import LogDetail from './pages/LogDetail/LogDetail';
import NotFound from './pages/NotFound/NotFound';
import Menu from './components/organisms/Menu/Menu';

const Routes = (props) => {
  console.log('props', props)
  return (
  <BrowserRouter>
    <Menu onLogOut={props.onLogOut}>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/logs' exact component={LogsList} />
        <Route path='/logs/:id' exact component={LogDetail} />
        <Route component={NotFound} />
      </Switch>
    </Menu>
  </BrowserRouter>
)};

export default Routes;