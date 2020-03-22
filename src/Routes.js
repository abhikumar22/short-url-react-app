import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./Contact/Contact";
import Home from "./Home/Home";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="*" component={Contact} />
                </Switch>
            </Router>
        )
    }
}
