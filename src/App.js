
import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";



const App = (props) => {
    return (

        <div className='app-wrapper'>
            <Header/>
            <Nav/>
            <div className='app-wrapper-content'>
{/*
                <Routes>
                    <Route path='/profile' element={<Profile />}/>
                    <Route path='/dialogs' element={<Dialogs />}/>
                </Routes>

                <Route path='/profile' component={Profile} />
                <Route path='/dialogs' component={Dialogs} />
                <Route path='/News' component={News} />
                <Route path='/Music' component={Music} />
                <Route path='/Settings' component={Settings} />

                <Route component={Dialogs}/>
                <Route component={Profile}/>*/}
            </div>
                <Dialogs/>
                <Profile/>
            <div className='app-wrapper-content'>
            </div>
        </div>

        
    );
}

export default App  ;
