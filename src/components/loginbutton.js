import React from 'react';

export default props => {
    const handleClick = e => {
        props.handleLogIn(e);
    }

    return(
        <div className='row centered mt-5'>
            <div className='container mt-2 text-center'>
                <button className="submit-button balsamiq-reg box pr-5 pl-5" onClick={handleClick}>LOG IN</button>
            </div>
        </div>
    )   
}