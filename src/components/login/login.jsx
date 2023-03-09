import React from 'react';
import teg from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {loginAPI} from "../../API/api";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";


let LoginForm = (props) => {
    return (
        <div className={teg.di}>
            <div className={teg.form}>
                <h1>Login</h1>
                <form onSubmit={props.handleSubmit}>
                    <div><Field placeholder={'Login'}    name={'login'} validate={[required]} component={Input}/></div>
                    <div><Field placeholder={'Password'} name={'password'} validate={[required]} component={Input}/></div>
                    <div><Field type={'checkbox'} name={'remember'} component={Input}/> remember me</div>
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
        const {login,password,rememberMe} = formData
       return  loginAPI.setLogin(login,password,rememberMe)
    }
    return (<div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;