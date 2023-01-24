  import React from 'react';
import teg from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
  import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div className={teg.content}>
           <ProfileInfo />
            <MyPosts posts={props.state.posts}/>
            Main content(Profile)
        </div>
    );
}

export default Profile;