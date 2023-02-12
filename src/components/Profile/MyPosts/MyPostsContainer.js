import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {returnType, returnTypeActionCreator} from "../../../redux/addLike-reducer";


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