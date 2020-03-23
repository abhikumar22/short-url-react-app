import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./Contact/Contact";
import Home from "./Home/Home";
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={Contact} />
                </Switch>
            </Router>
        )
    }
}
