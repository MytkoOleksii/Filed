import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterUserType, follow, getUsersThunkCreator, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";

import {AnyAction} from "redux";

type PropsType = {
 /*     currentPage: number
    //  totalUsersCount: number
    // onPageChanged: (pageNumber: number) => void
     pageSize: number
    //  users: Array<UserType>
    // followingInProgress: Array<number>
      unfollow: (userId: number) => any
     follow: (userId: number) => any
    // onFilterChanged: (filter: FilterUserType) => void
      filter: FilterUserType*/
}

export  const Users: React.FC<PropsType> = function (props) {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowInProgress)


    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter) as unknown as AnyAction)
    },[])


    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter) as unknown as AnyAction)
    }
    const onFilterChanged = (filter: FilterUserType) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter) as unknown as AnyAction)
    }
    const _follow = (userId: number) => {
        dispatch(follow(userId) as unknown as AnyAction)
    }
    const _unfollow = (userId: number) => {
        dispatch(unfollow(userId) as unknown as AnyAction)
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} filter={filter}/>

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />
            {users.map(u => <User user={u} key={u.id}
                                  followingInProgress={followingInProgress}
                                  unfollow={_unfollow}
                                  follow={_follow}
                />
            )}
        </div>
    );
}