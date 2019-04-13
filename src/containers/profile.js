// NPM MODULES
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';

// COMPONENTS
import NavBar from '../components/navbar';
import PostBox from '../components/home/post-box';
import AboutMe from '../components/profile/aboutme';

export default class Profile extends Component {
    state = {
        userLoggedIn: null,
        loggedInF: [],
        user: null,
        userPosts: [],
        showingPost: null,
        comments: [],
        likes: [],
        aboutMe: false,
        loading: true,
        following: [],
        followers: [],
        followingUserBoolean: false,  
    }

    static contextType = AuthContext;

    componentDidMount = () => setTimeout(() => this.loadUserData(), 1000);

    componentWillReceiveProps = () => setTimeout(() => this.loadUserData(), 1000);

    loadUserData = async () => {
            if (this.context.user) {
                const userLoggedIn = await axios.get(`http://bits-backend.herokuapp.com/user/id/${this.context.user.uid}`);
                const {username} = this.props.match.params;
                const {data: userObj} = await axios.get(`http://bits-backend.herokuapp.com/user/${username}`);
                const {data: userPosts} = await axios.get(`http://bits-backend.herokuapp.com/user/posts/${userObj.id}`);
                const followingCall = await axios.get(`http://bits-backend.herokuapp.com/follow/followings/${userObj.id}`);
                const followersCall = await axios.get(`http://bits-backend.herokuapp.com/follow/followers/${userObj.id}`);
                const loggedInFollowing = await axios.get(`http://bits-backend.herokuapp.com/follow/followings/${userLoggedIn.data.id}`);
                const {data: loggedInF} = loggedInFollowing.data;
                const {data: following,} = followingCall.data;
                const {data: followers,} = followersCall.data;
                let followingUserBoolean = false;
                for (let followingUser of loggedInF) {
                    if (followingUser.username.includes(userObj.username)) {
                        followingUserBoolean = true;
                    }
                }
                let comments= [];
                let likes = [];
                for (let post of userPosts.data) {
                    let comment = await axios.get(`http://bits-backend.herokuapp.com/post/${post.id}`);
                    const likesCall = await axios.get(`http://bits-backend.herokuapp.com/like/${post.id}`)
                    const {data: like} = likesCall.data;
                    if (like.length > 0) {
                        likes = likes.concat(like)
                    } else {
                        continue;
                    }
                    comments.push(comment);
                }
                this.setState((state, props) => ({
                    loggedInF,
                    userLoggedIn,
                    user: userObj,
                    userPosts: userPosts,
                    showingPost: userPosts.data[0],
                    comments: comments,
                    likes,
                    loading: false,
                    following,
                    followers,
                    followingUserBoolean,
                }));
            }
    }

    changePost = async e => {
        const {nodeValue: name,} = e.target.attributes[0];
        const {userPosts,} = this.state;
        const {showingPost,} = this.state;
        let postNum = userPosts.data.indexOf(showingPost);
        name === 'prev' ? postNum-- : postNum++;
        if (postNum < 0) postNum = 0;
        if (postNum > userPosts.data.length - 1) postNum = 0;
        const {id: currentPost} = userPosts.data[postNum];
        const {data: commentsOnPost,} = await axios.get(`http://bits-backend.herokuapp.com/post/${currentPost}`);
        const likesCall = await axios.get(`http://bits-backend.herokuapp.com/like/${currentPost}`)
        const {data: like} = likesCall.data;
        this.setState({
            showingPost: userPosts.data[postNum],
            comments: commentsOnPost.post,
            likes: like
        });
    }

    postRender = () => {
        if (!this.state.user) {
            return(
                <div className='row' style={{height: '100vh'}}>
                    <div className='col col-12 balsamiq-bold all-comments-button loading-font'>
                        <p>Loading...</p>
                    </div>
                </div>
            )
        } else if (this.state.userPosts.data.length > 0 && this.state.user) {
            return (
                <>
                    <PostBox posts={this.state.showingPost} comments={this.state.comments}
                        showPostPage={this.showPostPage} likes={this.state.likes} allPosts={this.state.userPosts.data} />
                    <div className='row all-comments-button mb-5'>
                        <div className='col col-12 balsamiq-bold text-center text-uppercase' style={{fontSize: 28}}>
                            <span name='prev' className='border-r pr-5 post-button' onClick={this.changePost}>Prev Post</span>  
                            <span name='next' className='post-button ml-5' onClick={this.changePost}>Next Post</span>
                        </div>
                    </div>
                </>
            )
         }  else {
            return(
                <div className='col col-12 balsamiq-bold text-center all-comments-button' style={{minHeight: '25vh', minWidth: '25vh'}}>
                    <h1>No Posts Yet</h1>       
                </div>
            )
        }
    }

    headerRender = () => {
        if (!this.state.user) {
            return(
                <div className='row' style={{height: '100vh'}}>
                    <div className='col col-12 balsamiq-bold all-comments-button loading-font'>
                        <p>Loading...</p>
                    </div>
                </div>
            )
        } else {
            return(
                <>
                    <div className='row mb-5' style={{justifyContent: 'space-evenly'}}>
                        <div className='col col-3'>
                            <img src={this.state.user.avatar} alt='avatar' className='theme-border' style={{minHeight: '30vh', maxHeight: '30vh', minWidth: '30vh', maxWidth: '30vh', borderRadius: '50%'}}/>
                        </div>
                        <div className='col col-8 theme-border no-backg'>
                            <div className='row pt-1'>
                                <div className='col col-3 balsamiq-reg' style={{textAlign: 'center', fontSize: 18}}>
                                        <span>{this.state.user.rel_status}</span>
                                </div>
                                <div className='col col-6 text-center balsamiq-bold' style={{fontSize: 32}}>
                                    {this.state.user.username}
                                </div>
                                <div className='col col-3 balsamiq-reg' style={{fontSize: 18}}>
                                    <span onClick={this.handleAboutMe}>About Me</span> | <span>Edit</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col col-12 text-center balsamiq-reg' style={{fontSize: 18}}>
                                    {`${this.state.user.first_name} ${this.state.user.last_name}`}
                                </div>
                            </div>
                            <div className='row balsamiq-reg mt-5' style={{fontSize: 18}}>
                                <div className='col col-4 text-center'>{this.state.followers.length} - Followers</div>
                                <div className='col col-4 text-center'>{this.state.following.length} - Following</div>
                                <div className='col col-4 text-center'>{this.state.userPosts.data.length} - Posts</div>
                            </div>
                            <div className='row balsamiq-reg mt-5 mb-1'>
                                <div className='col col-12 text-center' style={{fontSize: 18}}>
                                    <Link to={this.state.user.website_url}>{this.state.user.website_url}</Link>
                                </div>
                            </div>
                            <div className='row' style={{justifyContent: 'flex-end'}}>
                                <div className='col-2 text-center balsamiq-reg'>
                                    <button className='submit-button' onClick={this.handleFollow}>
                                        {(this.state.followingUserBoolean) ? 'Unfollow' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    toggleAboutMe = () => {
        this.setState((state, props) => ({
            aboutMe: !state.aboutMe,
        }));
    }

    aboutMeRender = () => {
        return(
            <AboutMe user={this.state.user} toggleAboutMe={this.toggleAboutMe} />
        )
    }

    handleAboutMe = () => {
        this.setState((state, props) => ({
            aboutMe: !state.aboutMe,
        }))
    }

    showProfile = userName => this.props.history.push(`/profile/${userName}`);

    showPostPage = post_id => this.props.history.push(`/post/${post_id}`);

    handleFollow = e => {
        const {id: follower_user_id} = this.state.userLoggedIn.data;
        const {id: followed_user_id} = this.state.user;
        const {followers} = this.state;
        const {username: loggedInUser} = this.state.userLoggedIn.data;

        if (e.target.innerText === 'Unfollow') {
            axios.delete(`http://bits-backend.herokuapp.com/follow/${follower_user_id}/${followed_user_id}`, {
                follower_user_id: this.state.userLoggedIn.data.id,
                followed_user_id: this.state.user.id,
            }); 
            let idx = null;
            for (let i = 0; i < followers.length; i++) {
                if (followers[i].username.includes(loggedInUser)) {
                    idx = i;
                }
            }
            let newFollowers = [];
            (idx === 0) ? newFollowers = followers.slice(1) : 
                newFollowers = followers.slice(0, idx).concat(followers.slice(idx + 1));
            
            this.setState({
                followers: newFollowers,
                followingUserBoolean: false,
            });
        } else {
            axios.post(`http://bits-backend.herokuapp.com/follow/`, {
                follower_user_id: this.state.userLoggedIn.data.id,
                followed_user_id: this.state.user.id,
            });

            this.setState((state) => ({
                followers: state.followers.concat([{
                    follower_user_id: this.state.userLoggedIn.data.id,
                    followed_user_id: this.state.user.id,
                }]),
                followingUserBoolean: true,
            }));
        }
    }

    submitSearch = searchQuery => this.props.history.push(`/searchpage/${searchQuery}`);

    render() {
        return(
            <>
                {(this.state.userLoggedIn) ? <NavBar showProfile={this.showProfile} user={this.state.userLoggedIn.data}
                    historyObj={this.props.history} submitSearch={this.submitSearch} /> : ''}
                {
                !this.state.aboutMe ? 
                    <div className='container mt-5 mb-5'>
                        {this.headerRender()}

                        <div className='row theme-border pr-5 pl-5 no-backg' style={{justifyContent: 'center'}}>
                            {this.postRender()}
                        </div>
                    </div> 
                :
                    this.aboutMeRender()
                }
            </>
        )
    }
}