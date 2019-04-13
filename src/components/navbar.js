// NPM MODULES
import React from 'react';
import {Link,} from 'react-router-dom';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';
import firebase from '../firebase';

// CSS FILES
import './navbar.css'

// FUNCTIONAL COMPONENT
export default props => {
    const handleProfile = () => {
        props.showProfile(props.user.username);
    }

    const handleLogOut = () => {
        firebase.auth().signOut();
        props.historyObj.push('/');
    }

    const handleSearch = e => {
        if (e.keyCode === 13) {
            props.submitSearch(e.target.value);
            e.target.value = '';
        }
    }

    return(
        <>
            <AuthContext.Consumer>
                {
                    user => {
                        if (!user.user) {
                            return(
                                <>
                                    <div className='row row-line no-backg'>
                                        <div className='col col-1 balsamiq-reg logo' style={{textAlign: 'end'}}>
                                            <Link to='/' style={{color: 'black', textDecoration: 'none',}}>BITS</Link>
                                        </div>
                                    </div>
                                </>
                            )
                        } else {
                            return(
                                <>
                                    <div className='row row-line no-backg'>
                                        <div className='col col-1 balsamiq-reg logo nav-border' style={{textAlign: 'end'}}>
                                            <Link to='/' style={{color: 'black', textDecoration: 'none',}}>BITS</Link>
                                        </div>
                                        <div className='col col-1 balsamiq-bold nav-border font-weight-bold nav-title'>
                                            <Link to='/' className='nav-link'>HOME</Link>
                                        </div>
                                        <div className='col col-1 balsamiq-bold nav-border font-weight-bold nav-title' style={{cursor: 'pointer'}} onClick={handleProfile}><span>PROFILE</span></div>
                                        <div className='col col-1 balsamiq-bold nav-border font-weight-bold nav-title' style={{cursor: 'pointer'}}><span>POST</span></div>
                                        <div className='search-div'>
                                            <input type='text' className='search-input theme-border balsamiq-reg' onKeyDown={handleSearch} placeholder='Search by username...' />
                                        </div>
                                        <div className='col col-1 user-div balsamiq-bold text-uppercase' style={{textAlign: 'center'}}>
                                            <span onClick={handleLogOut} style={{cursor: 'pointer'}}>LogOut</span>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    }
                }
            </AuthContext.Consumer>
        </>
    )
}