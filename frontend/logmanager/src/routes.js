import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import LogsList from './pages/LogsList/LogsList';
import LogDetail from './pages/LogDetail/LogDetail';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/organisms/Header/Header';
import Error500 from './pages/Error500/Error500';

const Routes = (props) => (
  <BrowserRouter>
    <Header onLogOut={props.onLogOut}>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' exact component={Login} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/logs' exact component={LogsList} />
        <Route path='/logs/:id' exact component={LogDetail} />
        <Route path='/error404' exact component={NotFound} />
        <Route path='/error500' exact component={Error500} />
        <Route exact component={NotFound} />
      </Switch>
    </Header>
  </BrowserRouter>
);

export default Routes;