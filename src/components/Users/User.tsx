import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from "../../types/types";
import {Button} from "antd";

type PropsType ={
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: React.FC<PropsType> = function  ({user, followingInProgress, unfollow, follow}) {

    return (
       <div  className={styles.us}>
                    <div>ID:{user.id}</div>
                <span>
                    <div >
                        <NavLink to={'/profile/'+ user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto}  />
                        </NavLink>
                        </div>
                    <div>
                        {user.followed ? <Button type={"primary"} size={"small"} disabled={followingInProgress.some(id => id == user.id)}
                                              onClick={() => {
                                                  unfollow(user.id)
                        }}>Unfollow</Button>
                            : <Button type={"primary"} size={"small"} disabled={followingInProgress.some(id => id == user.id)} onClick={()   => {
                                follow(user.id)
                            }} >Follow</Button> }
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.city"}</div>
                        <div>{"user.location.country"}</div>
                    </span>
                </span>
            </div>
    )
}

export default User;