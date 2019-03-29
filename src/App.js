// NPM MODULES
import React, {Component} from 'react';
import {Route} from 'react-router-dom';

// LOCAL MODULES
import firebase from './firebase';
import AuthContext from './contexts/auth_context';

// CSS FILES
import './app.css'

// CONTAINERS - PAGES
import SignUp from './containers/signup';
import Home from './containers/home';

class App extends Component {
  state = {
    user: null,
  }

  componentDidMount = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
        });
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    return (
      <>
        <AuthContext.Provider value={this.state}>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={SignUp} />
        </AuthContext.Provider>
      </>
    );
  }
}

export default App;
