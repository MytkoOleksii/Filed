import React, {lazy, Suspense, useEffect, useState} from "react";
import './App.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import {withLazyHOK} from "./components/hoc/withSuspenseHOK";
import {withRouter} from "./components/hoc/withRouter";
import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";
import {
    ContactsFilled,
    CustomerServiceTwoTone,
    DeploymentUnitOutlined,
    MessageFilled,
    SettingFilled,
    TeamOutlined,
    ToolFilled,
    UsergroupAddOutlined,
    UsergroupDeleteOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons';

import {NavLink, Route, Routes} from "react-router-dom";
import {UserPage} from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {Login} from "./components/login/login";

//------------------- React.lazy start -----------------------------------------------------------------//
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const {Header, Content, Footer, Sider} = Layout;

//const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer'));
const DialogsContainer = lazy(() => import ('./components/Dialogs/DialogsContainer'));
withLazyHOK(DialogsContainer, './components/Dialogs/DialogsContainer')
//const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));
//------------------- React.lazy  end -----------------------------------------------------------------//

type PropsType = ReturnType<typeof mapStateToProps>

//--------------------------------------------------------------------------------------//
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to="/profile">Profile</NavLink>, '1', <ContactsFilled/>,),
    getItem(<NavLink to="/dialogs">Dialogs</NavLink>, '2', <MessageFilled/>),
    getItem('User', 'sub1', <TeamOutlined/>, [
        getItem('All', '3', <UsergroupAddOutlined/>),
        getItem('Friend', '4', <UserSwitchOutlined/>),
        getItem('Unfollow', '5', <UsergroupDeleteOutlined/>),
    ]),
    getItem('Team', 'sub2', <DeploymentUnitOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem(<NavLink to="/music">Music</NavLink>, '9', <CustomerServiceTwoTone/>),
    getItem(<NavLink to="/settings">Settings</NavLink>, '10', <SettingFilled/>, [
            getItem(<NavLink to="/editprofile">Edit profile</NavLink>, '11', <ToolFilled />),
            getItem('Friend', '12', <UserSwitchOutlined/>),
            getItem('Unfollow', '13', <UsergroupDeleteOutlined/>),
        ]),
];


const App = function (props: any) {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    useEffect(() => {
        props.initializeApp();
    }, [])
    props.initializeApp();


    if (!props.initialized) {
        return <Preloader/>
    } else {
        // @ts-ignore
        return (

            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: 0, background: colorBgContainer}}><HeaderContainer/></Header>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                            main pages
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                                    <Route path='/dialogs' element={<DialogsContainer/>}/>
                                    <Route path='/users' element={<UserPage pageTitle={"samurai"}/>}/>

                                    <Route path='/News' element={<News/>}/>
                                    <Route path='/Settings' element={<Settings/>}/>
                                    <Route path={'/login'} element={<Login/>}/>

                                </Routes>
                            </Suspense>

                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>

        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

/*
let AppContainer = compose (
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);

let SamuraiJSApp = (props) => {
  return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default  SamuraiJSApp;*/
/* <div className='app-wrapper'>
     <HeaderContainer/>
     <div>
         <Nav/>
         <NewNFiends/>
     </div>
     <div className='app-wrapper-content'>
         main pages
         <Suspense fallback={<div>Loading...</div>}>
             <Routes>
                 <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                 <Route path='/dialogs' element={<DialogsContainer/>}/>
                 <Route path='/users' element={<UserPage pageTitle={"samurai"}/>}/>
                 {/!*   <Route path='/news' render={ () => <News/>} />*!/}
                 <Route path='/News' element={<News/>}/>
                 <Route path='/Settings' element={<Settings/>}/>
                 <Route path={'/login'} element={<Login/>}/>
             </Routes>
         </Suspense>
     </div>
 </div>*/
