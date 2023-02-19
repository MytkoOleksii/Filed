import React from 'react';
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/Useres-reducer";
import {connect} from "react-redux";
import axios from "axios";
import Users from "./Users";
import preloader from '../../assets/images/Loading.gif';
import Preloader from "../common/Preloader/Preloader";
class UsersClassContainer extends React.Component {
    constructor(props) {
        super(props);
        //if (this.props.users.length === 0) {
    }
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(response.data.totalCount)
            })
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            })
    }


    render() {
        let pagesCount = this.props.totalUsersCount / this.props.pageSize;
        let pages = [];
        for (let i=1; i < pagesCount; i++) {
            pages.push(i)}
        let curP = this.props.currentPage;// номер сторінки
        let curPF = ((curP - 3) < 0) ?  0  : curP - 3 ;
        let curPL = curP + 2;
        let slicedPages = pages.slice( curPF, curPL);
        return ( <>
                {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   slicedPages={slicedPages}
            />
            </>

        )}}



let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
};
//Варіант 1
/*let mapDispatchToProps = (dispatch) => {
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
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}*/
//Варіант 2
/*export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUserCount: setTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC,
}
)
(UsersClassContainer);*/
//Варіант 3
export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalCount, toggleIsFetching,})
(UsersClassContainer);
