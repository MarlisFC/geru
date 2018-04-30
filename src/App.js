import React, { Component } from 'react';
import './App.css';
import  {Header} from './containers/Header';
import {User} from "./containers/User";
import 'flatpickr/dist/themes/material_green.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';


class App extends Component {
  render() {
    return (
      <div >
        <Header/>
          <User/>
      </div>
    );
  }
}

export default App;
