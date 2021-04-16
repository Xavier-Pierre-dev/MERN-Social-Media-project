import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import Message from '../../pages/Message';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/profil" exact component={Profil}></Route>
            <Route path="/trending" exact component={Trending}></Route>
            <Route path="/message" exact component={Message}></Route>
            <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;