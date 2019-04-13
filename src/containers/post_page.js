// NPM MODULES
import React, {Component} from 'react';
import axios from 'axios';

// LOCAL MODULES
import AuthContext from '../contexts/auth_context';

// COMPONENTS
import NavBar from '../components/navbar';
import PostBox from '../components/post_page/post_box';

export default class PostPage extends Component {
    state = {
        loggedIn: null,
        posts: null,
        comments: [],
        likes: [],
        wantsToComment: false,
    }

    static contextType = AuthContext;

    componentDidMount = () => {
        setTimeout(() => this.loadPostData(), 1000);
    }

    loadPostData = async () => {
        const userObj = await axios.get(`http://bits-backend.herokuapp.com/user/id/${this.context.user.uid}`);
        const {data: loggedIn} = userObj;
        const {post_id} = this.props.match.params;
        const likesCall = await axios.get(`http://bits-backend.herokuapp.com/like/${post_id}`)
        const {data: likes} = likesCall.data;
        const postCall = await axios.get(`http://bits-backend.herokuapp.com/post/${post_id}`);
        const {post: postWcomments} = postCall.data;
        const comments = [];
        if (postWcomments.length === 0) {
            const postCall = await axios.get(`http://bits-backend.herokuapp.com/post/${post_id}/nocomment`);
            const {post: postNoComments} = postCall.data;
            postNoComments.post_id = post_id;
            this.setState(() => ({
                loggedIn,
                posts: postNoComments,
                likes,
            }));
        } else {
            const post = {
                post_id,
                post_author: postWcomments[0].post_author,
                post_img: postWcomments[0].post_img,
                post_text: postWcomments[0].post_text,
                username: postWcomments[0].username,
            }
            
            for (let comment of postWcomments) {
                const commentingUser = await axios.get(`http://bits-backend.herokuapp.com/user/sqlid/${comment.comment_author}`);
                const {username, avatar,} = commentingUser.data;
                const commentObj = {};
                commentObj.author = username;
                commentObj.authorAvatar = avatar;
                commentObj.authorID = comment.comment_author;
                commentObj.text = comment.comment_text;
                comments.push(commentObj);
            }

            this.setState((state) => ({
                loggedIn,
                posts: post,
                comments: state.comments.concat(comments),
                likes,
            }));
        }
    }

    openCommentBox = () => {
        this.setState((state) => ({
            wantsToComment: !state.wantsToComment,
        }));
    }

    postLike = (like_author, post_liked) => {
        axios.post('http://bits-backend.herokuapp.com/like/', {
            like_author, 
            post_liked,
        });

        this.setState((state) => ({
            likes: state.likes.concat([{like_author, post_liked}]),
        }));
    }

    postComment = (post_id, comment_author, comment_text) => {
        axios.post(`http://bits-backend.herokuapp.com/comment/`, {
            comment_author,
            post_id, 
            comment_text,
        });

        const newComment = [{
            author: this.state.loggedIn.username, 
            post_id, 
            text: comment_text,
        }];

        this.setState((state) => ({
            comments: state.comments.concat(newComment),
            wantsToComment: !state.wantsToComment,
        }));
    }

    showProfile = userName => this.props.history.push(`/profile/${userName}`);

    render () {
        return(
            <>
            {
                (!this.state.posts) ?
                        <>
                            <NavBar showProfile={this.showProfile} user={this.state.loggedIn} historyObj={this.props.history} />
                            <div className='container'>
                                <div className='row' style={{height: '100vh'}}>
                                    <div className='col col-12 balsamiq-bold all-comments-button loading-font'>
                                        <p>Loading...</p>
                                    </div>
                                </div>
                            </div>
                        </> : 
                        <>
                        <NavBar showProfile={this.showProfile} user={this.state.loggedIn} historyObj={this.props.history} />
                                <div className='row mt-5'>
                                    <div className='col-7'>
                                        <PostBox posts={this.state.posts} comments={this.state.comments}
                                            openCommentBox={this.openCommentBox} wantsToComment={this.state.wantsToComment}
                                            postComment={this.postComment} loggedIn={this.state.loggedIn}
                                            postLike={this.postLike} likes={this.state.likes} />
                                    </div>
                                    <div className='col-4 post-profile-comments'>
                                        {
                                            this.state.comments.map((e, i) => {
                                                return(
                                                    <div className='container m-1 p-1' key={i}>
                                                        <div className='row theme-border no-backg'>
                                                            <div className='col col-12 balsamiq-reg'>
                                                                <span className='balsamiq-bold'>{e.author}:</span>
                                                            </div>
                                                            <div className='col col-12 balsamiq-reg'>
                                                                <span>{e.text}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>       
                        </>
            }
            </>
        )
    }
}