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
            this.setState({ 
                err: message, 
            });
          })
    }

    handleSignUp = e => {
        this.props.history.push('/signup');
    }

    render() {
        const displayErr = this.state.err === '' ? '' 
            :   <> 
                    <div className='container'>
                        <div className="alert alert-dark theme-border balsamiq-reg mt-3 text-uppercase font-weight-bold" role="alert">{this.state.err}</div>
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
                                        <LogIn handleInputs={this.handleInputs} handleLogIn={this.handleLogIn} 
                                            email={this.state.email} password={this.state.password}/>
                                        <OR />     
                                        <SignUpButton handleSignUp={this.handleSignUp} />
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