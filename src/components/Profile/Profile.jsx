import React from 'react';
import teg from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";
  import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile(props) {
    return (
        <div className={teg.content}>
           <ProfileInfo />
            <MyPosts
                     posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     addPost={props.addPost} updateNewPostText={props.updateNewPostText}
                     addLikes={props.addLikes}
            />
            Main content(Profile)
        </div>
    );
}

export default Profile;