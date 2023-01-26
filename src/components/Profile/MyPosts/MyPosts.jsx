import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts(props) {



    let postsElements = props.posts.map( (element) => {
        return (
            <Post likesCount={element.likesCount} message={element.messages}/>
        )
    })

    let newPostElement = React.createRef();
    let addPost = function ()  {
        let text = newPostElement.current.value;
        alert(text)
    }

    return (

        <div className={teg.postsBlock}>
          <h3> My posts</h3>
            <div>
                <div>
                <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                <button onClick={ addPost }>Add post</button>
                </div>
            </div>

            <div className={teg.posts}>

                {postsElements}

                {/*<Post likesCount={postData[0].likesCount} message={postData[0].messages}/>
                <Post likesCount={postData[1].likesCount} message={postData[1].messages}/>*/}

            </div>
        </div>
    );
}

export default MyPosts;