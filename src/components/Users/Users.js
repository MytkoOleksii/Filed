import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {follow, unfollow} from "../../redux/users-reducer.ts";



function Users(props) {


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
}

export default Users;