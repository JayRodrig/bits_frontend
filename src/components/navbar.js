// NPM MODULES
import React from 'react';
import {Link} from 'react-router-dom';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';
import firebase from '../firebase';

// CSS FILES
import './navbar.css'

export default props => {
    
    const handleLogOut = () => {
        console.log(props)
        firebase.auth().signOut()
        // return(
        //     <Redirect to='/signup'></Redirect>
        // )
    }

    return(
        <>
            <AuthContext.Consumer>
                {
                    user => {
                        if (!user) {
                            return(
                                <>
                                    <div className='row row-line'>
                                        <div className='col col-2 balsamiq-reg logo'>BITS</div>
                                    </div>
                                </>
                            )
                        } else {
                            return(
                                <>
                                    <div className='row row-line'>
                                        <div className='col col-1 balsamiq-reg logo nav-border'>BITS</div>
                                        <div className='col col-1 balsamiq-reg nav-border font-weight-bold nav-title'>
                                            <Link to='/' className='nav-link'>HOME</Link>
                                        </div>
                                        <div className='col col-1 balsamiq-reg nav-border font-weight-bold nav-title'><span>PROFILE</span></div>
                                        <div className='col col-1 balsamiq-reg nav-border font-weight-bold nav-title'><span>POST</span></div>
                                        <div className='col col-1 balsamiq-reg nav-border font-weight-bold nav-title'><span>NOTIFICATIONS</span></div>
                                        <div className='search-div'>
                                            <input type='text' className='search-input theme-border' /><i className="fas fa-search"></i>
                                        </div>
                                        <div className='col col-1 user-div'>
                                            <div className='col col-10 theme-border user-icon' onClick={handleLogOut}>
                                            </div>
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