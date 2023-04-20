import React from "react";
import {Avatar, Button, Col, Layout, Row} from "antd";
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import {Header} from "antd/lib/layout/layout";
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {getSelectIsAuthSelector, selectUserCurrentSelector} from "../../redux/auth-selectors";
import {actionsCreator, getAuthUserData, logOutThunkCreator,} from "../../redux/auth-reducer";
import {AnyAction} from "redux";
import {NavLink} from "react-router-dom";
import {PoweroffOutlined} from "@ant-design/icons";
import t from "./Header.module.css";
type PropsType = {}

export const AppHeader: React.FC<PropsType> = (props) => {
    const isAuth = useSelector(getSelectIsAuthSelector)
    const login = useSelector(selectUserCurrentSelector)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logOutThunkCreator()as unknown as AnyAction)
    }

    const {Header} = Layout
    return (
        <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%',}}>
            <div>
                <Row>
                    <Col flex={2}>
                    </Col>
                    {isAuth
                        ? <div className={t.parent}>
                            <Col flex={"auto"} >
                                <div  className={t.hd}>
                                    <Avatar style={{backgroundColor: "#ffff", color: '#f80000'}} size={40}>{login}</Avatar>
                                </div>
                            </Col>
                            <Col flex={"auto"} >
                                <div className={t.hd}>
                            <Button type="primary" size={"middle"} onClick={logoutCallback}><PoweroffOutlined /></Button>
                                </div>
                            </Col>
                        </div>
                        :   <Col span={1}>
                            <Button type='primary' >
                    <NavLink to={'/login'}>Login</NavLink>
                            </Button>
                            </Col>
                    }
        </Row>
</div>
</Header>
)
};


//----------------------- OLD  ------------------//
/*  <header className={tag.header}>
      <img alt='download' src='https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png'/>
      <div className={tag.loginBlock}>
          { props.isAuth
              ? <div>{props.login} - <button onClick={props.logOut}>LogOut</button> </div>
              : <NavLink to={'/login'}>Login</NavLink> }
      </div>
  </header>*/
//@ts-ignore