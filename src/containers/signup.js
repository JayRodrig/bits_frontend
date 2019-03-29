import React, {Component} from 'react';
import NavBar from '../components/navbar';
import firebase from '../firebase';

import axios from 'axios';

export default class SignUp extends Component {

    state = {
        username: '',
        firebase_uid: '',
        avatar: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        rel_status: '',
        bio: '',
        foods: '',
        music: '',
        movies: '',
        website_url: '',
        err: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target.form[6].files[0];
        let firebase_uid = '';
        const {username, password, first_name, last_name, email, bio, foods, music, movies, rel_status, website_url,} = this.state;        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((response) => {
            firebase_uid = response.user.uid;
            const root = firebase.storage().ref(`/images/${username}`);
            const newImage = root.child(file.name)
            return newImage.put(file);
          })
          .then(snapshot => {
            return snapshot.ref.getDownloadURL();
          })
          .then(avatarURL => {
            return axios.post('http://bits-backend.herokuapp.com/user/', {
                username, 
                firebase_uid,
                avatar: avatarURL,
                first_name, 
                last_name,
                email,
                bio,
                foods,
                music,
                movies,
                rel_status,
                website_url,
            })              
          })
          .then(response => {
              this.props.history.push('/');
          })
          .catch(err => {
            const {message} = err;
            this.setState({
                'msg': message,
            });
          });
    }

    render() {
        return(
            <>
                <NavBar />
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col col-12 theme-border p-5 balsamiq-reg'>
                            <div className='row mb-5'>
                                <div className='col col-12 text-center'>
                                    <p className='title'>REGISTRATION FORM</p>
                                </div>
                            </div>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4" className='font-weight-bold signup-form-t'>USERNAME</label>
                                    <input type="text" name='username' className="form-control theme-border" id="inputUsername" onChange={this.handleChange}  />
                                    </div>
                                    <div className="form-group col-md-4">
                                    <label htmlFor="inputState" className='font-weight-bold signup-form-t'>RELATIONSHIP STATUS</label>
                                    <select id="inputState" name='rel_status' className="form-control theme-border" onChange={this.handleChange} >
                                        <option value>Choose...</option>
                                        <option>Single</option>
                                        <option>Taken</option>
                                        <option>N/A</option>
                                    </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4" className='font-weight-bold signup-form-t'>EMAIL</label>
                                        <input type="email" name='email' className="form-control theme-border" id="inputEmail4" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4" className='font-weight-bold signup-form-t'>PASSWORD</label>
                                        <input type="password" name='password' className="form-control theme-border" id="inputPassword4" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4" className='font-weight-bold signup-form-t'>FIRST NAME</label>
                                    <input type="text" name='first_name' className="form-control theme-border" id="inputFirst_name" onChange={this.handleChange}  />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4" className='font-weight-bold signup-form-t'>LAST NAME</label>
                                    <input type="text" name='last_name' className="form-control theme-border" id="inputLast_name" onChange={this.handleChange}  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar" style={{display: 'block'}} className='font-weight-bold signup-form-t'>Choose a profile picture:</label>
                                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                                </div>
                                <div className='row mt-4 mb-1'>
                                        <div className='col col-4'>
                                            <p className='font-weight-bold signup-form-t'>[OPTIONAL]</p>
                                        </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4" className='font-weight-bold signup-form-t'>BIO:</label>
                                    <input type="text" name='bio' className="form-control theme-border" id="inputBio" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4" className='font-weight-bold signup-form-t'>FOOD:</label>
                                    <input type="text" name='foods' className="form-control theme-border" id="inputFood" onChange={this.handleChange}  />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4" className='font-weight-bold signup-form-t'>MUSIC:</label>
                                    <input type="text" name='music' className="form-control theme-border" id="inputMusic" onChange={this.handleChange}  />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4" className='font-weight-bold signup-form-t'>MOVIES:</label>
                                    <input type="text" name='movies' className="form-control theme-border" id="inputMoviesName" onChange={this.handleChange}  />
                                    </div>
                                    <div className="form-group col-md-6">
                                    <label htmlFor="websiteurlinput4" className='font-weight-bold signup-form-t'>WEBSITE URL:</label>
                                    <input type="text" name='website_url' className="form-control theme-border" id="inputWebsiteURL" onChange={this.handleChange}  />
                                    </div>
                                </div>
                                <button type="submit" className="submit-button mb-3" onClick={this.handleSubmit}>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}