import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterUserType} from "../../redux/users-reducer";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    onFilterChanged: (filter: FilterUserType) => void
}

let Users: React.FC<PropsType> = function ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) {

    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                // totalUsersCount={props.totalUsersCount}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />
            {users.map(u => <User user={u} key={u.id}
                                  followingInProgress={props.followingInProgress}
                                  unfollow={props.unfollow}
                                  follow={props.follow}
                />
            )}
        </div>
    );
}

/*function Users(props) {

    return (
        <div>
                <Paginator currentPage={props.currentPage}
                           onPageChanged={props.onPageChanged}
                          // totalUsersCount={props.totalUsersCount}
                           totalItemsCount={props.totalUsersCount}
                           pageSize={props.pageSize}
                />
                {props.users.map(u => <User user={u} key={u.id}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                />
                )}
        </div>
    );
}*/

export default Users;