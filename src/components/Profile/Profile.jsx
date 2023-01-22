  import React from 'react';
import teg from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";
  import ProfileInfo from "./ProfileInfo/ProfileInfo";
  let postData = [
      {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
      {id: 2, likesCount: 12, messages: 'Are you'},
      {id: 3, likesCount: 45, messages: 'Simple pimple'},
      {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
      {id: 5, likesCount: 8, messages: 'good day'},
      {id: 6, likesCount: 34, messages: 'Hello world'},
  ]
function Profile() {
    return (
        <div className={teg.content}>
           <ProfileInfo />
            <MyPosts items={postData}/>
            Main content(Profile)
        </div>
    );
}

export default Profile;