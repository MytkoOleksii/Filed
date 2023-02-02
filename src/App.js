import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NFriends from "./components/nFriends/NFriends";
import {updateNewMessage} from "./redux/state";

const App = (props) => {

    return (

            <div className='app-wrapper'>
                <Header/>
                <div>
                <Nav/>
                <NFriends user={props.state.dialogsPage.dialogs}/>
                </div>

                <div className='app-wrapper-content'>
                    main pages
                    <Routes>
                        <Route path='/profile' element={<Profile addLikes={props.addLikes}
                                                                 profilePage={props.state.profilePage}
                                                                dispatch={props.dispatch}
                        />}/>
                        <Route path='/dialogs' element={<Dialogs store={props.store} dialogsPage={props.state.dialogsPage} addMessage={props.addMessage} updateNewMessage={props.updateNewMessage}/>}/>
                     <Route path='/news' render={ () => <News/>} />
                        {/*  <Route path='/News' element={<News/>}/>*/}
                        <Route path='/Music' element={<Music/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;
