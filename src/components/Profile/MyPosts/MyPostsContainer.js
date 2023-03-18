import React from 'react';
import {addPostActionCreator, } from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import MyPostsClass from "./MyPostsClass";



let mapStateToProps = (state) => {
   return {
       posts: state.profilePage.posts,
       newPostText: state.profilePage.newPostText,
   }
};

let mapDispatchToProps = (dispatch) => {
    return {
      /*  updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },*/
        addPost: (newPostText)=> {
            dispatch(addPostActionCreator(newPostText))
        },
     /*   returnType: () => {
            dispatch(returnType())
        },


        dispatch: (a,like) => {
            dispatch(returnTypeActionCreator(a,like))
        },*/

    }
}

let MyPostsContainer = connect(mapStateToProps,mapDispatchToProps) (MyPosts);

export default MyPostsContainer;