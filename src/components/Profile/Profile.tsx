import React from 'react';
import teg from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type PropsType = {
    saveProfile: (profile: ProfileType | null) => Promise<any>
    savePhoto: (file: File) => void
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    store: any

}
const Profile: React.FC<PropsType> = function (props: PropsType) {
    return (
        <div className={teg.content}>
            <ProfileInfo saveProfile={props.saveProfile}
                         savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
            />
            <MyPostsContainer store={props.store}/>
            Main content(Profile)
        </div>
    );
}


export default Profile;