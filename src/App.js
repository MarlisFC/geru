import React, { Component } from 'react';
import './App.css';
import 'flatpickr/dist/themes/material_green.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import {Switch,Route,HashRouter} from 'react-router-dom';
import Layout from "./containers/Layout";
import createBrowser from 'history/createBrowserHistory'

const history = createBrowser();


class App extends Component {
  render() {
    return (
        <div>
            <HashRouter  history={history}>
                <Switch>
                    <Route path="/" name="Home" component={Layout}/>
                </Switch>
            </HashRouter>
        </div>

    );
  }
}

export default App;
