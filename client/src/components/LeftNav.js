import React from 'react';
import {NavLink} from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/' exact activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home"></img>
                    </NavLink>
                    <br></br>
                    <NavLink to='/trending' exact activeClassName="active-left-nav">
                        <img src="./img/icons/rocket.svg" alt="home"></img>
                    </NavLink>
                    <br></br>
                    <NavLink to='/profil' exact activeClassName="active-left-nav">
                        <img src="./img/icons/user.svg" alt="home"></img>
                    </NavLink>
                    <br></br>
                    <NavLink to='/message' exact activeClassName="active-left-nav">
                        <img src="./img/icons/message1.svg" alt="home"></img>
                    </NavLink>
                </div>
            </div>        
        </div>
    );
};



export default LeftNav;