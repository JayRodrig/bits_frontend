import React from 'react';

export default props => {
    const showProfile = e => {
        props.showProfile(e.target.innerText);
    }

    const handleAllComments = () => {
        const {id: post_id} = props.posts;
        props.showPostPage(post_id);
    }
    
    const countLikes = () => {
        let likesOnPost = 0;
        const {likes,} = props;
        for (let like of likes) {
            const {post_liked: likeOnPostNum} = like;
            const {id: currentPostNum} = props.posts;
            if (likeOnPostNum === currentPostNum) {
                likesOnPost++;
            } else {
                continue;
            }
        }
        return likesOnPost;
    }

    const Loading = <h4>Loading...</h4>
    return(
            (!props.posts) === 0 ? Loading 
                :   <div className='container no-backg'>
                        <div className='container post-container theme-border mt-5 mb-5'>
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
                                    <span>{countLikes()} - Likes</span>
                                </div>
                            </div>
                            <div className='row theme-border m-1 p-1'>
                                <div className='col col-12 balsamiq-reg'>
                                    <span className='balsamiq-bold'>{props.posts.username}:</span>
                                </div>
                                <div className='col col-12 balsamiq-reg'>
                                    <span>{props.posts.post_text}</span>
                                </div>
                            </div>
                            <div className='row submit-button m-1'>
                                <div className='col col-12 balsamiq-bold all-comments-button' style={{textAlign: 'center'}} onClick={handleAllComments}>
                                    <span>SEE ALL COMMENTS</span>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}