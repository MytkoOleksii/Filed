import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NewNFiends from "./components/nFriends/NewNFiendsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

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
                        <Route path='/profile' element={<ProfileContainer />}/>
                        <Route path='/dialogs' element={<DialogsContainer />}/>
                        <Route path='/users' element={<UsersContainer/>} />
                  {/*   <Route path='/news' render={ () => <News/>} />*/}
                         <Route path='/News' element={<News/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>

    );
}

export default App;
