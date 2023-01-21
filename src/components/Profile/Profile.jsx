import React from 'react';
import teg from './Profile.module.css'
import Post from "./MyPosts/Post/Post";
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <div className={teg.content}>
            <div className={teg.im}>
                <img  src='https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div>
            <div>
                (Profile)
                avatar + description
            </div>
            <MyPosts/>

            Main content(Profile)
        </div>
    );
}

export default Profile;