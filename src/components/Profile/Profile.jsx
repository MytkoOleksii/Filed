  import React from 'react';
import teg from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
  import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";

function Profile() {
    return (
        <div className={teg.content}>
           <ProfileInfo />
            <MyPosts/>
            Main content(Profile)
        </div>
    );
}

export default Profile;