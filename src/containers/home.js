import React, {Component} from 'react';
import NavBar from '../components/navbar';
import LogIn from '../components/login';
import OR from '../components/or';
import SignUpButton from '../components/signupbutton';

export default class Home extends Component {

    state = {
        name: '',
        email: '',
        err: '',
    }

    render() {
        return(
            <>
                <NavBar />
                <LogIn />
                <OR />     
                <SignUpButton />
            </>
        )
    }
}