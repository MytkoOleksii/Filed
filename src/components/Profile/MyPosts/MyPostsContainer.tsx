import React from 'react';
import {actionsCreate,} from "../../../redux/profile-reducer";
import MyPosts, {MyPostDispatchPropsType, MyPostStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        /*
               newPostText: state.profilePage.newPostText,
        */
    }
}
/*
let mapDispatchToProps = (dispatch) => {
    return {
      /!*  updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },*!/
        addPost: (newPostText: string)=> {
            dispatch(actionsCreate.addPostActionCreator(newPostText))
        },
    }
}*/

let MyPostsContainer = connect<MyPostStatePropsType, MyPostDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actionsCreate.addPostActionCreator
})(MyPosts)

export default MyPostsContainer;