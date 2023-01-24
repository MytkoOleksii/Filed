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
                        <Route path='/profile' element={<Profile posts={props.postData}/>}/>
                        <Route path='/dialogs' element={<Dialogs itemsDialogs={props.dialogsData} itemsMessages={props.messageData}/>}/>
                        <Route path='/News' element={<News/>}/>
                        <Route path='/Music' element={<Music/>}/>
                        <Route path='/Settings' element={<Settings/>}/>
                        {/*<Route path='/Music' render={()=>{<Music/>}}/>
                        <Route path='/Settings' render={ () => <Settings/>} />*/}
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
