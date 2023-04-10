import React, {lazy, Suspense} from "react";
import './App.css';
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {Route, Routes} from "react-router-dom";
import NewNFiends from "./components/nFriends/NewNFiendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import {withLazyHOK} from "./components/hoc/withSuspenseHOK";
import {withRouter} from "./components/hoc/withRouter";
//------------------- React.lazy start -----------------------------------------------------------------//
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
//const DialogsContainer = React.lazy( () => import ('./components/Dialogs/DialogsContainer'));
const DialogsContainer = lazy(() => import ('./components/Dialogs/DialogsContainer'));
withLazyHOK(DialogsContainer, './components/Dialogs/DialogsContainer')
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));
//------------------- React.lazy  end -----------------------------------------------------------------//

type PropsType = ReturnType<typeof mapStateToProps>

class App extends React.Component<any, any> {

    catchAllUnhandledErrors = (reason: any, promise: any) => {
        alert('Some error occurred');
    }

    componentDidMount() {
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                            <Route path='/dialogs' element={<DialogsContainer/>}/>
                            <Route path='/users' element={<UsersContainer pageTitle={"samurai"}/>}/>
                            {/*   <Route path='/news' render={ () => <News/>} />*/}
                            <Route path='/News' element={<News/>}/>
                            <Route path='/Settings' element={<Settings/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
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
