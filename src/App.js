// NPM MODULES
import React, {Component} from 'react';
import {Route} from 'react-router-dom';

// LOCAL MODULES
import firebase from './firebase';
import AuthContext from './contexts/auth_context';

// CSS FILES
import './app.css';
import './components/login.css';
import './components/signupbutton';

// CONTAINERS - PAGES
import SignUp from './containers/signup';
import Home from './containers/home';
import PostPage from './containers/post_page';
import Profile from './containers/profile';
import LogIn from './containers/login';
import SearchPage from './containers/search_page';

// STATEFUL COMPONENT
class App extends Component {
  state = {
    user: null,
    token: '',
  }

  componentDidMount = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.auth().currentUser.getIdToken(false).then((token) => {
          this.setState({
            user,
            token,
          });
        }).catch((err) => {
          console.log(err)
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
          <Route path='/profile/:username' exact component={Profile} />
          <Route path='/login' exact component={LogIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/post/:post_id' exact component={PostPage} />
          <Route path='/searchpage/:searchquery' exact component={SearchPage} />
        </AuthContext.Provider>
      </>
    );
  }
}

export default App;
