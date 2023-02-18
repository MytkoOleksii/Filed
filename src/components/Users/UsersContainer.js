import React from 'react';
import {followAC, setCurrentPageAC, setTotalCountAC, setUsersAC, unfollowAC} from "../../redux/Useres-reducer";
import {connect} from "react-redux";
import axios from "axios";
import Users from "./Users";

class UsersClassContainer extends React.Component {
    constructor(props) {
        super(props);
        //if (this.props.users.length === 0) {
    }
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUserCount(response.data.totalCount)

            })
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })

    }

    render() {

        return (
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}

            />
        )
    }
}



let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
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
        },
        setCurrentPage : (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUserCount: (totalCount)=> {
            dispatch(setTotalCountAC(totalCount))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UsersClassContainer);
