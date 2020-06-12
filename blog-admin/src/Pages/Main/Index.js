import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from '../Login/Index';
import AdminIndex from '../AdminIndex/Index';

const Index = () => {
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/admin/index/" component={AdminIndex} />
        </Router>
    )
}

export default Index;