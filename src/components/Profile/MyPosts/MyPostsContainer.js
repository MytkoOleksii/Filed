import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";

function MyPostsContainer(props) {

    let state = props.store.getState();

    let addPost = function ()  {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text) => {
       let action = updateNewPostTextActionCreator(text);
       props.store.dispatch(action);
    }

    return (
       <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                posts={state.profilePage.posts}
                newPostText={state.profilePage.newPostText}
                dispatch={props.store.dispatch}
       />
    );
}

export default MyPostsContainer;