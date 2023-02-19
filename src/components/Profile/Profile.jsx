import React from 'react';
import teg from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

function Profile(props) {
    return (
        <div className={teg.content}>
           <ProfileInfo profile={props.profile} />
            <MyPostsContainer store={props.store} />
            Main content(Profile)
        </div>
    );
}


export default Profile;