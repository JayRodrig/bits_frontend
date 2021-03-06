// NPM MODULES
import React from 'react';

// CSS FILES
import './login.css';

export default props => {
    
    const handleInputs = e => {
        props.handleInputs(e);
    }
    
    const handleSubmit = e => {
        props.handleLogIn(e);
    }

    const handleSubmitEnter = e => {
        if (e.keyCode === 13) {
            props.handleLogIn(e);
        }
    }

    return(
        <div className='container'>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col col-6 pr-5 pl-5 mt-5 theme-border no-backg'>
                    <form>
                        <div style={{textAlign: 'center'}} className='mt-3'>
                            <p className='balsamiq-reg title'>LOG IN</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className='balsamiq-reg form-titles'>EMAIL</label>
                            <input type="text" name='email' value={props.email} className="form-control theme-border balsamiq-reg" id="usernameinput" 
                                onChange={handleInputs} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='balsamiq-reg form-titles'>PASSWORD</label>
                            <input type="password" name='password' value={props.password} className="form-control theme-border balsamiq-reg" id="passwordinput" 
                                onChange={handleInputs} onKeyDown={handleSubmitEnter} />
                        </div>
                        <button type="submit" className="mb-5 submit-button balsamiq-reg" onClick={handleSubmit}>SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}