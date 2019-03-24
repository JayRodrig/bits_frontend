import React from 'react';
import './login.css';

export default props => {
    return(
        <div className='container'>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col col-6 pr-5 pl-5 mt-5 theme-border'>
                <form>
                    <div style={{textAlign: 'center'}} className='mt-3'>
                        <p className='balsamiq-reg title'>LOG IN</p>
                    </div>
                    <div className="form-group">
                        <label for="UserName" className='balsamiq-reg form-titles'>USERNAME</label>
                        <input type="text" className="form-control theme-border balsamiq-reg" id="usernameinput" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1" className='balsamiq-reg form-titles'>PASSWORD</label>
                        <input type="password" className="form-control theme-border balsamiq-reg" id="passwordinput" />
                    </div>
                    <button type="submit" className="mb-5 submit-button balsamiq-reg">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}