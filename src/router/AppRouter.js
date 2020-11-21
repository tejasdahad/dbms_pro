import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import AddDomain from '../components/AddDomain';
import Profile from '../components/Profile';
import MenuBar from '../components/Navbar';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/add_domain" component={AddDomain}/>
            <Route path='/profile' component={Profile} />
            <Route path='/appbar' component={MenuBar} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;