import React, { useContext } from 'react';
import {UidContext} from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import Log from '../components/Log';
import Private_Chat from '../components/Private_Chat/Private_Chat.js';


const Message = () => {
    const uid = useContext(UidContext);
    return (
        <div>
        {uid ? (
            
            <div className="trending-page">
                <LeftNav/>
            <div className="main">
                <Private_Chat></Private_Chat> 
            </div>
            
            </div>
            
            

            
            
        
        ):(
            <div className="profil-page">
            <div className="log-container">
            <Log signin={false} signup={true} />
            
            <div className="img-container">
                <img src="./img/log.svg" alt="img-login"/>
            </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default Message;