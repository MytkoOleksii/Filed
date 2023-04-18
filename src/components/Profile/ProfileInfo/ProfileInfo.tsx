import React, {ChangeEvent, useEffect, useState} from 'react';
import teg from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import avatar from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus:(status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}

const ProfileInfo: React.FC<PropsType> = function (props) {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement> ) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]) //????????????
        }
    }
    const onSubmit =  (formData: ProfileType) => {
        // todo: remove then
        props.saveProfile(formData).then (
            () => {
                setEditMode(false);
            })
    }

    return (
        <div>
            <div className={teg.im}>
                <img alt={'ava'}
                     src='https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
            </div>
            <div className={teg.descriptionBlock} key={props.profile.id}>
                <div>
                    <div>
                        <div className={teg.avaStatus}>
                            <div className={teg.about}>
                                <img src={props.profile.photos.large || avatar} className={teg.ava}/>
                                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                                {/*  {props.profile.photos.large // если нету фото загружается аватар
                                    ? <img alt={'avatar'} className={teg.ava} src={props.profile.photos.large}/>
                                    : <img alt={'avatar'} className={teg.ava} src={avatar}/>
                                }*/}
                            </div>
                            <div className={teg.about}>
                                <div className={teg.status}>
                                    Status profile:
                                    <ProfileStatusWithHooks status={props.status}
                                                            updateStatus={props.updateStatus}/></div>
                            </div>
                        </div>
                    </div>
                </div>
                {editMode
                    ? <ProfileDataForm  onSubmit={onSubmit} initialValues={props.profile} profile={props.profile} />
                    : <ProfileData {...props} isOwner={props.isOwner} goToEditMode={()=>{setEditMode(true)}}/>}
                {/*  <div>
                        <div>
                            <h3>{props.profile.fullName}</h3>
                        </div>
                        <div>
                            <p><b>О бо мне:</b> {props.profile.aboutMe}</p>
                        </div>
                        <div>
                            <div>
                                Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
                            </div>
                            {props.profile.lookingForAJob &&
                                <div>
                                    <b>My professional skills</b>: {props.profile.lookingForAJobDescriptionb}
                                </div>
                            }
                        </div>
                        <div>
                            <div><p><b>Contact:</b></p> {Object.keys(props.profile.contacts).map(key => {
                                return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                            })}
                            </div>
                        </div>
                        <div>
                            <p><b>Мои соц.сети:</b>
                                <li><a href={"https:///" + props.profile.contacts.facebook}>Facebook</a></li>
                                <li><a href={"http:///" + props.profile.contacts.vk}>Vk</a></li>
                                <li><a href={"http:///" + props.profile.contacts.twitter}>Twitter</a></li>
                                <li><a href={"http:///"}>Instagram</a></li>
                                <li>Youtube:</li>
                            </p>
                        </div>
                    </div>*/}
                avatar + description
            </div>
        </div>
    );
};
//-----------------------------------------------------//
type ProfilePropsType ={
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            {props.isOwner &&
                <div>
                    <button onClick={props.goToEditMode}>edit</button>
                </div>
            }
            <div>
                <h3>{props.profile.fullName}</h3>
            </div>
            <div>
                <p><b>О бо мне:</b> {props.profile.aboutMe}</p>
            </div>
            <div>
                <div>
                    Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {props.profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                    </div>
                }
            </div>
            <div>
                <div><p><b>Contact:</b></p> {
                    Object
                        .keys(props.profile.contacts)
                        .map(key => {
                            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]}/>
                        })}
                </div>
            </div>
        </div>
    )

}

type ContactType = {
    contactTitle: string
    contactValue: string
}
const Contact:React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={teg.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;