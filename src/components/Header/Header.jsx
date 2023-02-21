import React from "react";
import tag from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={tag.header}>
            <img src='https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png'/>
            <div className={tag.loginBlock}>
                { props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )

}

export  default  Header