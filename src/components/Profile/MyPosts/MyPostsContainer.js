import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

function MyPostsContainer() {

    return (
        <StoreContext.Consumer>
            { (store) => (
       <MyPosts
           updateNewPostText={(text) => {
                let action = updateNewPostTextActionCreator(text);
                store.dispatch(action);}}
                addPost={ () => {store.dispatch(addPostActionCreator());}}
                posts={store.getState().profilePage.posts}
                newPostText={store.getState().profilePage.newPostText}
                dispatch={store.dispatch}/>
                )}
            </StoreContext.Consumer>
    )}

export default MyPostsContainer;