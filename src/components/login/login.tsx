import React from 'react';
import teg from './login.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import  style from '../common/FormsControls/FormsControls.module.css'
import s from  './login.module.css'
import {AppStateType} from "../../redux/redux-store";

interface  LoginFormOwnProps  {
    captchaUrl: string
}
let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>& LoginFormOwnProps> = ({handleSubmit,error,captchaUrl,}) => {
    return (
        <div className={teg.di}>
            <div className={teg.form}>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    {createField('Email','email',[required], Input)}
                    {createField('Password','password',[required], Input, {type: 'password'})}
                    {createField(null,'rememberMe',null, Input, {type: 'checkbox'}, "remember me")}

                    {/*<div><Field placeholder={'Email'}    name={'email'} validate={[required]} component={Input}/></div>
                    <div><Field placeholder={'Password'} name={'password'} validate={[required]} component={Input} type={'password'}/></div>
                    <div><Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me</div>*/}

                    { captchaUrl &&  <img src={captchaUrl} className={s.captcha}/>}
                    { captchaUrl && createField('Symbols from image', "captcha",[required],Input,{})}
                    <div>
                        {error &&  <div className={style.formSummaryError}>{error}</div> }
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType & LoginFormOwnProps>({form: "login"}) (LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchType ={
    loginTC: (email: string, password:string, rememberMe: boolean, captcha: any) => void
}

type LoginFormValuesType = {email: string, password: string, rememberMe: boolean, captcha: string}
const Login: React.FC<MapStatePropsType & MapDispatchType> = (props) => {
    const onSubmit = (formData: any) => {
        props.loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}  captchaUrl={props.captchaUrl} />
        </div>
    );
}
const matStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect (matStateToProps, {loginTC: loginThunkCreator,}) (Login);