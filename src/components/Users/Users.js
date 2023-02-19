import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

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
                <span>
                    <div>
                        <NavLink to={'/profile/'+ u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles} />
                        </NavLink>
                        </div>
                    <div>


                        {u.followed ? <button onClick={() => {props.unfollow(u.id)}} >Unfollow</button>
                            : <button onClick={()   => {props.follow(u.id)}} >Follow</button> }
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