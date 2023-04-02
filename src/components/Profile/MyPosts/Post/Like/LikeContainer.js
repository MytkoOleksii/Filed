import React from 'react';
import {connect} from "react-redux";
import Like from "./Like";
import {addPostActionCreator, updateNewPostTextActionCreator, returnTypeActionCreator} from "../../../../../redux/profile-reducer.ts";
//import {returnTypeActionCreator, } from "../../../../../redux/addLike-reducer";

/*let Elements = state.profilePage.posts.map( (element) => {
    return {
        id: element.id,
        key: element.id,
        likesCount: element.likesCount,
    }
})*/


let mapStateToProps = (state) => {
    return {
        state: state,

        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        returnTypeAC: (id,like) => {
            dispatch(returnTypeActionCreator(id,like))
        },
    }
}

let LikeContainer = connect(mapStateToProps,mapDispatchToProps) (Like);

export default LikeContainer;