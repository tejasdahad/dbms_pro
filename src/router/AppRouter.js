import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import AddDomain from '../components/AddDomain';
import Profile from '../components/Profile';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/add_domain" component={AddDomain}/>
            <Route path='/profile' component={Profile} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;