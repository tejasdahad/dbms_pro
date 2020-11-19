import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import AddDomain from '../components/AddDomain';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/add_domain" component={AddDomain}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;