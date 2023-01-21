import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts() {
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

                <Post sum={123} message='Hi, how are you?'/>
                <Post sum='321' message='It`s my first post.'/>

            </div>
        </div>
    );
}

export default MyPosts;