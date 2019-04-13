// NPM MODULES
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';
import firebase from '../firebase';

// COMPONENTS
import NavBar from '../components/navbar';
import LogInForm from '../components/loginform';

// STATEFUL COMPONENT
export default class LogIn extends Component {
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

          })
          .catch(err => {
            const {message} = err;
            this.setState({ 
                err: message, 
            });
          })
    }

    render() {
        const displayErr = this.state.err === '' ? '' 
            :   <> 
                    <div className='container'>
                        <div className="alert alert-light theme-border balsamiq-reg mt-3 text-uppercase font-weight-bold" role="alert">{this.state.err}</div>
                    </div>
                </>
        
        return(
            <>
                <AuthContext.Consumer>
                    {
                        user => {
                            if (!user.user) {
                                return(
                                    <>
                                        <NavBar />
                                        {displayErr}
                                        <LogInForm handleInputs={this.handleInputs} handleLogIn={this.handleLogIn} 
                                            email={this.state.email} password={this.state.password}/>
                                    </>
                                )
                            } else {
                                return(
                                    <>
                                        <Redirect to='/'></Redirect>
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