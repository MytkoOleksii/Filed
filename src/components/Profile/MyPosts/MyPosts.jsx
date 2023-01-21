import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts() {

    let postData = [
        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hih i'},
        {id: 5, likesCount: 8, messages: 'good day'},
        {id: 6, likesCount: 34, messages: 'Hello world'},
    ]


    return (

        <div className={teg.postsBlock}>
          <h3> My posts</h3>
            <div>
                <div>
                <textarea></textarea>
                </div>
                <div>
                <button>Add post</button>
                </div>
            </div>

            <div className={teg.posts}>

                <Post likesCount={postData[0].likesCount} message={postData[0].messages}/>
                <Post likesCount={postData[1].likesCount} message={postData[1].messages}/>

            </div>
        </div>
    );
}

export default MyPosts;