import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './app.css'

import SignUp from './containers/signup';
import Home from './containers/home';

class App extends Component {
  render() {
    return (
      <>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={SignUp} />
      </>
    );
  }
}

export default App;
