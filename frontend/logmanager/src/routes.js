import React from 'react';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import LogsList from './pages/LogsList/LogsList';
import LogDetail from './pages/LogDetail/LogDetail';
import NotFound from './pages/NotFound/NotFound';

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={App} />
      <Route path='/login' exact={true} component={Login} />
      <Route path='/sign-up' exact={true} component={SignUp} />
      <Route path='/logs' exact={true} component={LogsList} />
      <Route path='/logs/:id' exact={true} component={LogDetail} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;