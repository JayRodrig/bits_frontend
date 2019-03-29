// NPM MODULES
import React, {Component} from 'react';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';
import firebase from '../firebase';

// COMPONENTS
import NavBar from '../components/navbar';
import LogIn from '../components/login';
import OR from '../components/or';
import SignUpButton from '../components/signupbutton';

export default class Home extends Component {
    state = {
        email: '',
        password: '',
        err: '',
    }

    handleInputs = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLogIn = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('Returns: ', response);
          })
          .catch(err => {
            const {message} = err;
            console.log(message)
            this.setState({ 
                err: message, 
            });
          })
    }

    render() {
        return(
            <>
                <AuthContext.Consumer>
                    {
                        user => {
                            console.log(user)
                            if (!user.user) {
                                return(
                                    <>
                                        <NavBar />
                                        <LogIn handleInputs={this.handleInputs} handleLogIn={this.handleLogIn} />
                                        <OR />     
                                        <SignUpButton />
                                    </>
                                )
                            } else {
                                return(
                                    <>
                                        <NavBar />
                                        <h1>Someone just logged in baby</h1>
                                    </>
                                )
                            }
                        }
                    }
                </AuthContext.Consumer>
            </>
        )
    }
}