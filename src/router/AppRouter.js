import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../components/Login';
import Domain from '../components/Domain';
import Profile from '../components/Profile';
import MenuBar from '../components/Navbar';
import Admin from '../components/Admin';
import Dummy from '../components/Dummy';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/domain" component={Domain}/>
            <Route path='/profile' component={Profile} />
            <Route path='/appbar' component={MenuBar} />
            <Route path='/admin' component={Admin} />
            <Route path='/dummy' component={Dummy} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;