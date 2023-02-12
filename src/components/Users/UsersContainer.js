import React from 'react';
import {mapStateToPropsFactory} from "react-redux/es/connect/mapStateToProps";

import Users from "./Users";
import {followAC, setUsersAC, unfollowAC} from "../../redux/Useres-reducer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }

};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID))
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps ) (Users) ;
