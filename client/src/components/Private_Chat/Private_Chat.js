
import React, { useContext, useState } from "react";
import "./Private_Chat.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";


import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import { UidContext } from "../AppContext";



const Private_Chat = () => {
  const uid = useContext(UidContext);
  

  return (
    // BEM naming convention
    <div className="private_chat">
      {!uid ? (
        <div></div>

        
      ): (
        <div className="private_chat__body">
          <Router>
            <Switch>
              <Route path="/rooms/:member_2Id">
                {/* Sidebar */}
                <Sidebar></Sidebar>
  
                {/* Chat */}
                <Chat></Chat>
              </Route>
  
  
              <Route path="/">
              
                <Sidebar></Sidebar>
                <Chat></Chat>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
       </div>

  );
};

export default Private_Chat;
