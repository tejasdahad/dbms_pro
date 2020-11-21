import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Domain from '../components/Domain';
import Profile from '../components/Profile';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/domain" component={Domain}/>
            <Route path='/profile' component={Profile} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;