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
let dialogsData = [
    {id: 1, name: 'Dimon'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Din'},
    {id: 4, name: 'Ben'},
    {id: 5, name: 'Alex'},
    {id: 6, name: 'Djeck'},
]
let messageData = [
    {id: 1, messages: 'hi'},
    {id: 2, messages: 'Are you'},
    {id: 3, messages: 'Simple pimple'},
    {id: 4, messages: 'Ben roberts hi hih i'},
    {id: 5, messages: 'good day'},
    {id: 6, messages: 'Hello world'},
]

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    main pages
                    {/*  <Routes>
                    <Route path='/profile' element={<Profile />}/>
                    <Route path='/dialogs' element={<Dialogs />}/>
                     </Routes>*/}
                    <Routes>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/dialogs' element={<Dialogs itemsDialogs={dialogsData} itemsMessages={messageData}/>}/>
                        <Route path='/News' element={<News/>}/>
                        <Route path='/Music' element={<Music/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

// function App() {
//     return (
//         <BrowserRouter>
//             <div className="app-wrapper">
//                 <Header />
//                 <Nav />
//                 <div className="app-content">
//                     <Routes>
//                         <Route path='/profile' element={<Profile />}/>
//                         <Route path='/dialogs' element={<Dialogs />}/>
//                     </Routes>
//                 </div>
//             </div>
//         </BrowserRouter>
//     );
// }


export default App;
