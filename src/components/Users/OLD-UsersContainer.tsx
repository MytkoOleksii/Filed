/*
import React from 'react';
import {
    FilterUserType,
    follow, getUsersThunkCreator,
    unfollow
} from "../../redux/users-reducer";
import {connect, useSelector} from "react-redux";
import {Users} from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter,
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


//---------------------------- Start ---------------------------- //
type UserPagePropsType ={
    pageTitle: string

}
const UserPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return (<>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users />
        </>
    )
}
//----------------------- end  -----------------------------------------//


type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterUserType
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterUserType) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersClassContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterUserType) => {
        let {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        return (<>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    //totalUsersCount={this.props.totalUsersCount}
                    // pageSize={this.props.pageSize}
                    //  currentPage={this.props.currentPage}
                  //  onPageChanged={this.onPageChanged}
                  //  users={this.props.users}
                   // follow={this.props.follow}
                   // unfollow={this.props.unfollow}
                  //  followingInProgress={this.props.followingInProgress}
                   // onFilterChanged={this.onFilterChanged}
                   // filter={this.props.filter}
                />
            </>

        )
    }
}

type OwnPropsType = {
    pageTitle: string
}

// Варіант 5 селектори
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        //  users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowInProgress(state),
        //isAuth: state.auth.isAuth,
        filter: getUsersFilter(state),
    }
};
/!*!// Варіант 4
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
    {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: getUsersThunkCreator}) (withRedirect);*!/!*!/

export default compose(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
   /!* follow,
    unfollow,*!/
   /!* getUsers: getUsersThunkCreator*!/
}))(UsersClassContainer)
*/
