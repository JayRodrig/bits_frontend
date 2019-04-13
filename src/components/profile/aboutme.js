import React from 'react';

export default props => {
    const handleUserHome = e => {
        props.toggleAboutMe();
    }

    return(
        <div className='container theme-border mt-5 no-backg'>
            <div className='row mt-5'>
                <div className='col col-11 text-right balsamiq-bold' style={{fontSize: 18,}}>
                    <span onClick={handleUserHome}>User Home</span>
                </div>
            </div>
            
            <div className='row mt-3'>
                <div className='col col-12 balsamiq-bold text-center'>
                    <h1>About Me</h1>
                </div>
            </div>

            <div className='row mt-5 mb-5'>
                <div className='col col-6 balsamiq-reg'>
                    <h4>Bio:</h4>
                    <div className='col col-12 theme-border' style={{height: 'auto'}}>
                        <p>{props.user.bio}</p>
                    </div>        
                </div>
                
                <div className='col col-6 balsamiq-reg'>
                    <h4>Favorite Food Types:</h4>
                    <div className='col col-12 theme-border' style={{height: 'auto'}}>
                        <p>{props.user.foods}</p>
                    </div>
                </div>
            </div>

            <div className='row mt-3 mb-5'>
                <div className='col col-6 balsamiq-reg'>
                    <h4>Favorite Music Genre / Artists / Bands:</h4>
                    <div className='col col-12 theme-border' style={{height: 'auto'}}>
                        <p>{props.user.music}</p>
                    </div>        
                </div>
                
                <div className='col col-6 balsamiq-reg'>
                    <h4>Favorite Movies:</h4>
                    <div className='col col-12 theme-border' style={{height: 'auto'}}>
                        <p>{props.user.movies}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}