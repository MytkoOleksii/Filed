import React from "react";
import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NewNFiends from "./components/nFriends/NewNFiendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

//--ХУК якій заміняє withRouter ---------------------------//
export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
};
//----------------------------------------------------------//

class App extends React.Component {
    componentDidMount()
    {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <div>
                    <Nav/>
                    <NewNFiends/>
                </div>
                <div className='app-wrapper-content'>
                    main pages
                    <Routes>
                        <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                        <Route path='/dialogs' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        {/*   <Route path='/news' render={ () => <News/>} />*/}
                        <Route path='/News' element={<News/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
initialized: state.app.initialized,
})

export default compose (
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);

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
