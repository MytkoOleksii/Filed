import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NFriends from "./components/nFriends/NFriends";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NewNFiends from "./components/nFriends/NewNFiendsContainer";
//import {updateNewMessage} from "./redux/OLD-store";

const App = (props) => {

    return (

            <div className='app-wrapper'>
                <Header/>
                <div>
                <Nav/>
                <NewNFiends />
                </div>

                <div className='app-wrapper-content'>
                    main pages
                    <Routes>
                        <Route path='/profile' element={<Profile store={props.store} />}/>
                        <Route path='/dialogs' element={<DialogsContainer />}/>
                  {/*   <Route path='/news' render={ () => <News/>} />*/}
                         <Route path='/News' element={<News/>}/>
                        <Route path='/Music' element={<Music/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;
