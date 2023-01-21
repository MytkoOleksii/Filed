import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts() {
    return (

        <div>
            My posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>

            <div className={teg.posts}>

                <Post sum={123} message='Hi, how are you?'/>
                <Post sum='321' message='It`s my first post.'/>

            </div>
        </div>
    );
}

export default MyPosts;