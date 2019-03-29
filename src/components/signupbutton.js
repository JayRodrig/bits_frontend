import React from 'react';
import './signupbutton.css';

export default props => {
    const handleClick = e => {
        console.log('signupbuttonhere')
        props.handleSignUp(e);
    }

    return(
        <div className='row centered'>
            <div className='container mt-2'>
                <button className="submit-button balsamiq-reg box pr-5 pl-5" onClick={handleClick}>SIGN UP</button>
            </div>
        </div>
    )   
}