import React from 'react';
import teg from './login.module.css'
import s from './login.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style from '../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store";
import {GetStringKeys} from "../Profile/MyPosts/MyPosts";
import {AnyAction} from "redux";

type  LoginFormOwnProps = {
    captchaUrl:string | null
}
let LoginForm: React.FC<InjectedFormProps <LoginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps> = (props) => {
    return (
        <div className={teg.di}>
            <div className={teg.form}>
                <h1>Login</h1>

                <form onSubmit={props.handleSubmit}>
                    {createField<LoginFormsValuesTypeKeys>('Email','email',[required], Input)}
                    {createField<LoginFormsValuesTypeKeys>('Password','password',[required], Input, {type: 'password'})}
                    {createField<LoginFormsValuesTypeKeys>(undefined,'rememberMe',[], Input, {type: 'checkbox'}, "remember me")}
                    { props.captchaUrl &&  <img src={props.captchaUrl} className={s.captcha}/>}
                    { props.captchaUrl && createField<LoginFormsValuesTypeKeys>('Symbols from image', "captcha",[required],Input,{})}
                    <div>
                        {props.error &&  <div className={style.formSummaryError}>{props.error}</div> }
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType , LoginFormOwnProps, any>({form: 'login'}) (LoginForm)
//--------------------------------------- END -----------------------------------------------------------------------//

export type LoginFormValuesType = {email: string, password: string, rememberMe: boolean, captcha: string,}

type LoginFormsValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = (props) => {

    const captchaUrl = useSelector( (state: AppStateType) => state.auth.captchaUrl )
    const isAuth = useSelector( (state: AppStateType) => state.auth.isAuth,)

    const dispatch = useDispatch();

    const onSubmit = (formData: any) => {
        // Отправляет форму(email,password,rememberMe,captcha) на регистрацию
        dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)as unknown as AnyAction)
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}  captchaUrl={captchaUrl} />
        </div>
    );
}

