import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";

function MyPosts(props) {

    let postsElements = props.posts.map( (element) => {
        return (
            <Post id={element.id} likesCount={element.likesCount} message={element.messages} dispatch={props.dispatch} />
        )
    })

    let newPostElement = React.createRef();
    let addPost = function ()  {
        // props.addPost()
        //  props.dispatch({ type: 'ADD-POST'});
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        // props.updateNewPostText(text);
        //  /* 1 */ props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: text })
        //  /* 2 */ let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text };props.dispatch(action)
        /* 3 */ props.dispatch(updateNewPostTextActionCreator(text))
    }

    return (

        <div className={teg.postsBlock}>
            <h3> My posts </h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
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