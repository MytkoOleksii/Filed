import React from 'react';
import teg from "./ProfileInfo.module.css";

function ProfileInfo (props) {
    return (
        <div >
            <div className={teg.im}>
                <img   src='https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div>
            <div className={teg.descriptionBlock}>
            avatar + description
            </div>
        </div>
    );
}

export default ProfileInfo ;