import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../OLD-StoreContext";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
   return {
       posts: state.profilePage.posts,
       newPostText: state.profilePage.newPostText,
   }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: ()=> {
            dispatch(addPostActionCreator())
        },

        dispatch: () => {
            dispatch()
        }

    }
}

let MyPostsContainer = connect(mapStateToProps,mapDispatchToProps) (MyPosts);

export default MyPostsContainer;