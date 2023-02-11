import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";

function MyPosts(props) {

    let postsElements = props.posts.map( (element) => {
        return (
            <Post id={element.id} key={element.id} likesCount={element.likesCount} message={element.messages} dispatch={props.dispatch} />
        )
    })

    let newPostElement = React.createRef();

    let onAddPost = function ()  {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
            props.updateNewPostText(text);
    }

    return (

        <div className={teg.postsBlock}>
          <h3> My posts </h3>
            <div>
                <div>
                <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                <button onClick={ onAddPost }>Add post</button>
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