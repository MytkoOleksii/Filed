import React from 'react';
import teg from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";


let LoginForm = (props) => {
    return (
        <div className={teg.di}>
            <div className={teg.form}>
                <h1>Login</h1>
                <form onSubmit={props.handleSubmit}>
                    <div><Field placeholder={'Email'}    name={'email'} validate={[required]} component={Input}/></div>
                    <div><Field placeholder={'Password'} name={'password'} validate={[required]} component={Input} type={'password'}/></div>
                    <div><Field type={'checkbox'} name={'rememberMe'} component={Input}/> remember me</div>
                    <div>
                        <button>Login</button>
                    </div>
                    <div></div>
                </form>
            </div>
        </div>
    );
};

const LoginReduxForm = reduxForm({form: "login"}) (LoginForm)

function Login(props) {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (<div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );

// мой вариант
/*function Login(props) {
    const onSubmit = (formData) => {
        const {login,password,rememberMe} = formData
       return  loginAPI.setLogin(login,password,rememberMe)
    }
    return (<div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );*/
}
const matStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect (matStateToProps, {login: loginThunkCreator,}) (Login);