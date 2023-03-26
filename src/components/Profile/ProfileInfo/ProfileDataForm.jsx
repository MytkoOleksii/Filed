import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';
import style from  '../../common/FormsControls/FormsControls.module.css';


const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <button>Save</button>
                </div>
                {props.error &&  <div className={style.formSummaryError}>{props.error}</div> }
                <div>
                    <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
                </div>
                <div>
                    <p><b>О бо мне:</b></p> {createField("About me", 'aboutMe', [], Textarea)}
                </div>
                <div>
                    <p><b>Looking for a job:</b>
                    </p> {createField("", 'lookingForAJob', [], Input, {type: "checkbox"})}
                </div>
                <div>
                    <p><b>My professional skills:</b></p>
                    {createField("My professional skills", 'lookingForAJobDescription', [], Textarea)}
                </div>
                <div>
                    <div><p><b>Contact:</b></p> {Object.keys(props.profile.contacts).map(key => {
                        return <div className={s.contact}>
                        <b>{key}: </b> {createField(key, "contacts." + key, [], Input)}
                        </div>
                    })}
                    </div>
                </div>
            </div>
        </form>
    )

}

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);

export default ProfileDataFormReduxForm;