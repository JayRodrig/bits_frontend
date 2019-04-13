import React from 'react';

export default props => {
    const showProfile = e => {
        props.showProfile(e.target.innerText);
    }

    const handleComment = e => {
        props.openCommentBox();
    }

    const handleLike = e => {
        console.log(props)
        const {id: like_author} = props.loggedIn;
        const {post_id: post_liked} = props.posts;
        props.postLike(like_author, post_liked);
    }

    const handleCommentSubmission = e => {
        e.preventDefault();
        const {post_id,} = props.posts;
        const {value: comment_text} = e.target.form[0];
        const {id: comment_author} = props.loggedIn;
        props.postComment(post_id, comment_author, comment_text);
    }

    const renderPostFooter = _ => {
        if (!props.wantsToComment) {
            return(
                <>
                    <div className='row theme-border m-1 p-1' no-backg>
                        <div className='col col-12 balsamiq-reg'>
                            <span className='balsamiq-bold'>{props.posts.username}:</span>
                        </div>
                        <div className='col col-12 balsamiq-reg'>
                            <span>{props.posts.post_text}</span>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <form>
                    <div className='row m-1 p-1 no-backg'>
                        <input type='text' placeholder='Comment...' className='balsamiq-reg theme-border p-1' style={{width: '100%'}}></input>
                    </div>
                    <div className='row m-1 p-1' style={{justifyContent: 'flex-end'}}>
                        <div className='col-2 p-1'>
                            <button type='submit' className='submit-button balsamiq-reg' onClick={handleCommentSubmission}>Comment</button>
                        </div>
                    </div>
                </form>
            )
        }
    }

    const Loading = <h4>Loading...</h4>
    return(
            (!props.posts) === 0 ? Loading 
                : 
                  <div className='container postpage-container theme-border mt-5 mb-5 no-backg'>
                        <div className='row row-line pb-1'>
                            <div className='col col-1 user-pic user-pic-img theme-border ml-2 mt-1' style={{backgroundImage: `${props.posts.post_img}`}}>
                            </div>
                            <div className='col col-2 mt-1 balsamiq-reg'>
                                <span className='balsamiq-bold' style={{cursor: 'pointer',}} onClick={showProfile}>{props.posts.username}</span>
                                <br></br>
                                <span>timeStamp</span>
                            </div>
                        </div>
                        <div className='row row-line'>
                            <div>
                                <img src={props.posts.post_img} alt='post-img' style={{height: 'auto', width: '100%',}} />
                            </div>
                        </div>
                       <div className='row row-line'>
                            <div className='col col-6 balsamiq-reg'>
                                <span>{props.likes.length} - Likes</span>
                                <span> | </span>
                                <span>{props.comments.length} - {props.comments.length > 1 ? `Comments` : `Comment`}</span>
                            </div>
                            <div className='col col-6' style={{textAlign: 'end'}}>
                                <span className='ml-1 mr-1 balsamiq-reg' style={{cursor: 'pointer'}} onClick={handleLike}>Like</span>                            
                                <span className='balsamiq-reg'> | </span> 
                                <span className='ml-1 balsamiq-reg' style={{cursor: 'pointer'}} onClick={handleComment}>Comment</span>                            
                            </div>
                        </div>
                        {renderPostFooter()}
                    </div>
    )
}