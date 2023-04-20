import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from  '../../common/FormsControls/FormsControls.module.css';
import {GetStringKeys} from "../MyPosts/MyPosts";
import {ProfileType} from "../../../types/types";
import {Button} from "antd";

type PropsType = {
    profile: ProfileType

}

type ProfileTypeKeys = GetStringKeys<ProfileType>

    const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,PropsType>& PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                   {/* <Button type={"primary"} size={"small"}>Save</Button>*/}

                    <button>Save</button>
                </div>
                {props.error &&  <div className={style.formSummaryError}>{props.error}</div> }
                <div>
                    <b>Full name:</b> {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
                </div>
                <div>
                    <p><b>О бо мне:</b></p> {createField<ProfileTypeKeys>("About me", 'aboutMe', [], Textarea)}
                </div>
                <div>
                    <p><b>Looking for a job:</b>
                    </p> {createField<ProfileTypeKeys>("", 'lookingForAJob', [], Input, {type: "checkbox"})}
                </div>
                <div>
                    <p><b>My professional skills:</b></p>
                    {createField<ProfileTypeKeys>("My professional skills", 'lookingForAJobDescription', [], Textarea)}
                </div>
                <div>
                    <div><p><b>Contact:</b></p> {Object.keys(props.profile.contacts).map(key => {
                        return <div  key={key} className={s.contact}>
                            {/*todo: create same  */}
                        <b>{key}: </b> {createField(key, "contacts." + key, [], Input)}
                        </div>
                    })}
                    </div>
                </div>
            </div>
        </form>
    )

}

const ProfileDataFormReduxForm = reduxForm<ProfileType,PropsType>({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);

export default ProfileDataFormReduxForm;