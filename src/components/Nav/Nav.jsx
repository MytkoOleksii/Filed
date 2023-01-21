import React from 'react';
import tagName from './Nav.module.css'


function Nav() {
    return (
        <nav className={tagName.nav}>
            Menu
            <div className={tagName.item}>
                <a href="/profile">Profile</a>
            </div>
            <div className={tagName.item}>
                <a href="/dialog">Dialogs</a>
            </div>
            <div className={tagName.item}>
                <a href="/setting">Setting</a>
            </div>

           {/*<div className={tagName.item}>*/}
           {/*     <Nav to="/profile" className={navData=>navData.isActive? tagName.activeLink: tagName.item}> Profile1 </Nav>*/}
           {/*     <NavLink to="/profile" style={({ isActive }) =>({color: isActive ? 'green' : 'blue'})}>Главная</NavLink>*/}
           {/*     <NavLink to={`/profile`} className={navData => navData.isActive ? `${tagName.link} ${tagName.active}` : tagName.link}>*/}
           {/*         Profile*/}
           {/*     </NavLink>*/}
           {/* </div>*/}
           {/* <div className={`${tagName.item} ${tagName.active}`}>*/}
           {/*     <NavLink to='/dialogs' className={({isActive}) => isActive ? 'active-link' : ''}>Message</NavLink>*/}
           {/* </div>*/}
           {/* <div className={tagName.item}>*/}
           {/*     <NavLink to='/News'>News</NavLink>*/}
           {/* </div>*/}
           {/* <div className={tagName.item}>*/}
           {/*     <NavLink to='/Music'>Music</NavLink>*/}
           {/* <div className={tagName.item}>*/}
           {/*     <NavLink*/}
           {/*         to='/settings'*/}
           {/*         className={({ isActive }) => isActive ? `${tagName.activeLink}` : `${tagName.item}`}*/}
           {/*     >Settings</NavLink>*/}
           {/*     <NavLink to='/Settings'>Settings</NavLink>*/}
           {/* </div>
            </div>*/}
        </nav>
    );
}

export default Nav;