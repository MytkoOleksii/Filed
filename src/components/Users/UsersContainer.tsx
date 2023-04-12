import React from 'react';
import {
    FilterUserType,
    follow, getUsersThunkCreator,
    unfollow
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type OwnPropsType = {
    pageTitle: string
}

type MapStatePropsType ={
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>

}
type MapDispatchPropsType ={
    getUsers: (currentPage: number, pageSize: number, term: string) => void
    follow: (userId: number) => void
    unfollow:(userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersClassContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize,'');
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize,'' )
    }

    onFilterChanged = (filter: FilterUserType) => {
        let {currentPage, pageSize} = this.props;
this.props.getUsers(currentPage,pageSize,filter.term)

    }

    render() {
        return ( <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
                   onFilterChanged={this.onFilterChanged}
            />
            </>

        )}}
// Варіант 5 селектори
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        //  users: getUsersSuperSelector(state),
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state) ,
        followingInProgress: getFollowInProgress(state),
        //isAuth: state.auth.isAuth,
    }
};
/*// Варіант 4
/!*
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth,
    }
};
*!/

//Варіант 1
/!*let mapDispatchToProps = (dispatch) => {
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
}*!/
//Варіант 2
/!*export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUserCount: setTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC,
}
)
(UsersClassContainer);*!/
//Варіант 3
/!*
let withRedirect = withAuthRedirect(UsersClassContainer)

export default connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: getUsersThunkCreator}) (withRedirect);*!/*/

export default  compose (connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow,  getUsers: getUsersThunkCreator})) (UsersClassContainer)
