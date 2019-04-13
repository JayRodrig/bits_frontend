// NPM MODULES
import React, {Component} from 'react';
import axios from 'axios';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';
import firebase from '../firebase';

// COMPONENTS
import NavBar from '../components/navbar';
import LogInButton from '../components/loginbutton';
import SignUpButton from '../components/signupbutton';
import OR from '../components/or';
import PostBox from '../components/home/post-box';
import NewPostModal from '../components/home/postModal';    

// STATEFUL COMPONENT
export default class Home extends Component {
    
    state = {
        user: '',
        followingUsers: [],
        followingPosts: [],
        showingPost: null,
        comments: [],
        likes: [],
        loadingPosts: true,
        newPost: false,
        searchQuery: '',
        noPosts: false,
        allUsers: null,
    }

    static contextType = AuthContext;

    componentDidMount = () => setTimeout(() => this.loadUserData(), 1000);

    loadUserData = async () => {
        if (this.context.user) {
            try {
                const userObj = await axios.get(`http://bits-backend.herokuapp.com/user/id/${this.context.user.uid}`);
        
                const {id,} = userObj.data;
                const following = await axios.get(`http://bits-backend.herokuapp.com/follow/followings/${id}`)
                const {data,} = following.data;
                let followingPosts = [];
                for (let followingUser of data) {
                    const userPosts = await axios.get(`http://bits-backend.herokuapp.com/user/posts/${followingUser.id}`);
                    const {data,} = userPosts.data;
                    if (data.length > 0) {
                        followingPosts = followingPosts.concat(data);
                    } else {
                        continue;
                    }
                }

                if (followingPosts.length !== this.state.followingPosts.length) {
                    const showingPost = followingPosts[0];
                    const {data: commentsOnPost,} = await axios.get(`http://bits-backend.herokuapp.com/post/${showingPost.id}`);
                    let likes = [];
                    for (let post of followingPosts) {
                        const likesCall = await axios.get(`http://bits-backend.herokuapp.com/like/${post.id}`)
                        const {data: like} = likesCall.data;
                        if (like.length > 0) {
                            likes = likes.concat(like)
                        } else {
                            continue;
                        }
                    }
                    this.setState((state, props) => ({
                        user: userObj.data,
                        followingUsers: data,
                        followingPosts: followingPosts,
                        showingPost: followingPosts[0],
                        comments: commentsOnPost.post,
                        likes,
                        loadingPosts: !state.loadingPosts,
                    }));
                } else {
                    const allUsersCall = await axios.get(`http://bits-backend.herokuapp.com/user/`);
                    const {data,} = allUsersCall.data;
                    this.setState((state) => ({
                        user: userObj.data,
                        followingUsers: data,
                        loadingPosts: false,
                        noPosts: true,
                        allUsers: data,
                    }));
                }

            } catch(err) {
                console.log(err);
            }
        }
    }

    changePost = e => {
        const {nodeValue: name,} = e.target.attributes[0];
        const {followingPosts,showingPost,} = this.state;
        let postNum = followingPosts.indexOf(showingPost);
        name === 'prev' ? postNum-- : postNum++;
        if (postNum < 0) postNum = 0;
        if (postNum > followingPosts.length - 1) postNum = 0;
        this.setState({
            showingPost: followingPosts[postNum],
        });
    }

    setPost = e => {
        e.preventDefault();
        const {username} = this.state.user;
        const {id: post_author,} = this.state.user;
        const post_text = e.target.form[0].value;
        const file = e.target.form[1].files[0];
        const root = firebase.storage().ref(`/images/${username}`);
        const newImage = root.child(file.name)
        newImage.put(file)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL()
            })
            .then(post_img => {
                return axios.post(`http://bits-backend.herokuapp.com/post/`, {
                    post_author,
                    post_img,
                    post_text,
                });
            })
            .then(response => {
                console.log(response);
                this.setState((state) => ({
                    newPost: !state.newPost,
                }))
            })
            .catch(err => console.log(err));
    }

    showProfile = userName => this.props.history.push(`/profile/${userName}`);

    showPostPage = post_id => this.props.history.push(`/post/${post_id}`);

    handleSignUp = () => this.props.history.push('/signup');

    handleLogIn = () => this.props.history.push('/login');

    toggleNewPost = () => this.setState((state) => ({newPost: !state.newPost}));

    submitSearch = searchQuery => this.props.history.push(`/searchpage/${searchQuery}`);

    handleUserClick = e => this.showProfile(e.target.innerText);

    renderNewPost = () => {
        if (this.state.newPost) {
            return(
                <NewPostModal activeModal={this.state.newPost} toggle={this.toggleNewPost} setPost={this.setPost} />
            );
        }
    }
    
    render() {     
        return(
            <>
               <AuthContext.Consumer>
                    {
                        user => {
                            if (!user.user) {
                                return(
                                    <>
                                        <NavBar showProfile={this.showProfile} user={this.state.user} historyObj={this.props.history} />
                                        <div className='container'>
                                                <LogInButton handleLogIn={this.handleLogIn} />
                                                <OR />
                                                <SignUpButton handleSignUp={this.handleSignUp} />                                            
                                        </div>
                                    </>
                                )
                            } else if (!this.state.showingPost && this.state.loadingPosts) {
                                return(
                                    <>
                                        <NavBar showProfile={this.showProfile} user={this.state.user} submitSearch={this.submitSearch} historyObj={this.props.history} />
                                        <div className='container'>
                                            <div className='row' style={{height: '100vh'}}>
                                                <div className='col col-12 balsamiq-bold all-comments-button loading-font'>
                                                    <p>Loading...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            } else if (user.user && !this.state.loadingPosts && this.state.noPosts) {
                                return(
                                    <>
                                        {this.renderNewPost()}
                                        <NavBar showProfile={this.showProfile} user={this.state.user} submitSearch={this.submitSearch} historyObj={this.props.history} />
                                        <div className='container'>
                                            <div className='row mt-5' style={{justifyContent: 'flex-end'}}>
                                                <div className='col col-2 vertically-al theme-border balsamiq-bold text-center submit-button'>
                                                    <span className='p-2' onClick={this.toggleNewPost}>NEW POST</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col col-12 balsamiq-bold text-center all-comments-button' style={{minHeight: '25vh', minWidth: '25vh'}}>
                                                    <h1 style={{display: 'inline-block'}}>No Posts Yet</h1>              
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-12 text-center balsamiq-bold'>
                                                    <h3 style={{display: 'inline-block'}}>Some Users To Follow:</h3>
                                                </div>
                                                {
                                                    this.state.allUsers.map((e, i) => {
                                                        return(
                                                            <div className='col-12 theme-border mb-5 no-backg' key={i}>
                                                                <div className='row p-1'>
                                                                    <img className='col-2 search-user-pic theme-border ml-2 mt-1' alt='avatar' src={e.avatar} />
                                                                    <div className='col-2'> 
                                                                        <span className='balsamiq-bold' style={{fontSize: 18, display:'inline-block', cursor: 'pointer'}}
                                                                            onClick={this.handleUserClick}>{e.username}</span>
                                                                        <span className='balsamiq-reg' style={{fontSize: 18, display:'inline-block'}}>{e.first_name} {e.last_name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            } else {
                                return(
                                    <>
                                        {this.renderNewPost()}
                                        <NavBar showProfile={this.showProfile} user={this.state.user} submitSearch={this.submitSearch} historyObj={this.props.history} />
                                        <div className='container'>
                                            <div className='container'>
                                                <div className='row mt-5' style={{justifyContent: 'flex-end'}}>
                                                    <div className='col col-2 vertically-al theme-border balsamiq-bold text-center submit-button'>
                                                        <span className='p-2' onClick={this.toggleNewPost}>NEW POST</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='container theme-border mt-5 mb-5 no-backg'>                                    
                                                <PostBox posts={this.state.showingPost} comments={this.state.comments} 
                                                    showProfile={this.showProfile} showPostPage={this.showPostPage} likes={this.state.likes} />
                                                <div className='row all-comments-button mb-5'>
                                                    <div className='col col-6 balsamiq-bold text-center text-uppercase' style={{fontSize: 28}}>
                                                        <span name='prev' className='border-r pr-5 post-button' onClick={this.changePost}>Prev Post</span>  
                                                        <span name='next' className='post-button ml-5' onClick={this.changePost}>Next Post</span>
                                                    </div>
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
}