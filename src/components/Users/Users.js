import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../API/api";

function Users(props) {


    return (
        <div>
            <div>
                <div className={styles.block}>
                    {props.slicedPages.map(p => {
                        return ( <span   className={props.currentPage === p && styles.selectedPage || props.currentPage !== p && styles.page }
                                        onClick={(e)=>{props.onPageChanged(p)}}>{p}</span>
                        )})}
                </div>
                {props.users.map(u => <div key={u.id} className={styles.us}>
                    <div>ID:{u.id}</div>
                <span>
                    <div >
                        <NavLink to={'/profile/'+ u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles} />
                        </NavLink>
                        </div>
                    <div>


                        {u.followed ? <button disabled={props.followingInProgress.some(id => id == u.id)}
                                              onClick={() => {
                                                  props.unfollow(u.id)

                             /*   props.toggleFollowingProgress(true, u.id);
                            usersAPI.deleteUsersUnfollow(u.id)
                                .then(data => {
                                        if (data.resultCode == 0) {
                                            props.unfollow(u.id);
                                        }
                                        props.toggleFollowingProgress(false, u.id)

                                    }

                           /!* axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        {withCredentials: true,
                                            headers: {
                                            "API-KEY": "ea6bd0bc-5a76-4173-9e3a-c5be313ce490"
                                            }
                                        }, )
                                .then(response => {
                                    if (response.data.resultCode == 0) {
                                        props.unfollow(u.id);
                                    }
                        });*!/
                                )*/
                        }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id == u.id)} onClick={()   => {

                                props.follow(u.id)

                              /*  props.toggleFollowingProgress(true, u.id);


                                usersAPI.postUsersFollow(u.id)
                                    .then(data => {
                                        if (data.resultCode == 0) {
                                            props.follow(u.id)
                                        }
                                            props.toggleFollowingProgress(false, u.id)

                                    }

/!*
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                          {},
                                {withCredentials: true,
                                    headers: {
                                        "API-KEY": "ea6bd0bc-5a76-4173-9e3a-c5be313ce490"
                                    }
                                } )
                                    .then(response => {
                                       if (response.data.resultCode == 0) {

                                           props.follow(u.id);
                                       }

                                    });*!/

                                    )*/
                            }} >Follow</button> }
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </span>
                </span>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;