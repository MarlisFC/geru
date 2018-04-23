import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  {Header} from './containers/Header';
import {User} from "./containers/User";
import 'flatpickr/dist/themes/material_green.css';


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
