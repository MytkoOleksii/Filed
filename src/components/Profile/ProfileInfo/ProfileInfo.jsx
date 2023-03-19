import React from 'react';
import teg from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import avatar from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

/*
function FontAwesomeIcon(props: { size: string, fixedWidth: boolean, icon: * }) {
    return null;
}*/

function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={teg.im}>
                <img alt={'ava'}
                    src='https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
            </div>
            <div className={teg.descriptionBlock} key={props.profile.id}>
                <div >
                    <div >
                        <div className={teg.avaStatus} >
                            <div className={teg.about}>
                                {props.profile.photos.large
                                    ? <img alt={'avatar'} className={teg.ava} src={props.profile.photos.large}/>
                                    : <img alt={'avatar'} className={teg.ava} src={avatar}/>
                                }
                            </div>
                            <div className={teg.about}>
                                <div className={teg.status}>
                                    Status profile:
                                    <ProfileStatusWithHooks status={props.status}
                                                   updateStatus={props.updateStatus}/> </div></div>
                        </div>
                    </div>
                </div>
                <div >
                    <h3>{props.profile.fullName}</h3>
                    <p><b>О бо мне:</b> {props.profile.aboutMe}</p>
                    <p><b>Мои соц.сети:</b>
                        <li><a href={"https:///" + props.profile.contacts.facebook}>Facebook</a></li>
                        <li><a href={"http:///" + props.profile.contacts.vk}>Vk</a></li>
                        <li><a href={"http:///" + props.profile.contacts.twitter}>Twitter</a></li>
                        <li><a href={"http:///"}>Instagram</a></li>
                        <li>Youtube:</li>
                    </p>
                </div>
                avatar + description
            </div>
        </div>
    );
}

export default ProfileInfo;