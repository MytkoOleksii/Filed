import React, {lazy, Suspense, useEffect, useState} from "react";
import './App.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import {withLazyHOK} from "./components/hoc/withSuspenseHOK";
import {withRouter} from "./components/hoc/withRouter";
import {Breadcrumb, Layout, Menu, MenuProps, theme,} from "antd";

import {
    ContactsFilled,
    CustomerServiceTwoTone,
    DeploymentUnitOutlined,
    MessageFilled, NotificationTwoTone,
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
import {AppHeader} from "./components/Header/AppHeader";


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
    getItem(<NavLink to="/users">Users</NavLink>, 'sub1', <TeamOutlined/>,[
        getItem(<NavLink to="/users">All</NavLink>, '3', <UsergroupAddOutlined/>),
        getItem(<NavLink to="/users?term=&friend=true&page=1">Friend</NavLink>, '4', <UserSwitchOutlined/>),
        getItem(<NavLink to="/users?term=&friend=false&page=1">Unfollow</NavLink>, '5', <UsergroupDeleteOutlined/>),
    ]),
    getItem('Team', 'sub2', <DeploymentUnitOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem(<NavLink to="/news">News</NavLink>, '9', <NotificationTwoTone />),
    getItem(<NavLink to="/music">Music</NavLink>, '1', <CustomerServiceTwoTone/>),
    getItem(<NavLink to="/settings">Settings</NavLink>, '11', <SettingFilled/>, [
            getItem(<NavLink to="/editprofile">Edit profile</NavLink>, '12', <ToolFilled />),
            getItem('Friend', '13', <UserSwitchOutlined/>),
            getItem('Unfollow', '14', <UsergroupDeleteOutlined/>),
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

        return (

            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)'}}/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: 0, background: colorBgContainer}}>
                        <AppHeader/>
                    </Header>
                    <Content style={{margin: '5 8px', backgroundColor: '#76b5c7'}}>
                       {/* <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div style={{padding: 1, minHeight: 360,backgroundColor: '#76b5c7'}}>

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
                    <Footer style={{textAlign: 'center',}}>Ant Design ©2023 Created by IT-KAMASUTRA :) </Footer>
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
