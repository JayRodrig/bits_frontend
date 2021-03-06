import React from 'react';

export default props => {
    const handleClick = e => {
        props.handleSignUp(e);
    }

    return(
        <div className='row centered'>
            <div className='container mt-2 text-center'>
                <button className="submit-button balsamiq-reg box pr-5 pl-5" onClick={handleClick}>SIGN UP</button>
            </div>
        </div>
    )   
}