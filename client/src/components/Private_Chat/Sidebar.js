import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from "./SidebarChat";


import { useStateValue } from './StateProvider';
import { useSelector } from "react-redux";

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const userData = useSelector((state)=>state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);


   // const [{user},dispatch] = useStateValue();


/*     Effectue le useEffect seulement une fois a l'initialisation
    quand snap
 */      /*    useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
        setRooms(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data()
            }
        )

        ))
    ));

    return () => {
        unsubscribe();
    }
},[]);  */

  return (
    <div className="sidebar">
      <div className="sidebar__header">
      {/* <Avatar  src={user?.photoURL}></Avatar> */}
      <Avatar  src={userData.picture} alt="user-pic"></Avatar>
      
        <div className="sidebar__headerRight">
        {/* IconButton wrapp les boutons afin de créer un effet hover par dessus */}
          <IconButton>
            <DonutLargeIcon></DonutLargeIcon>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchIcon></SearchIcon>
            <input placeholder="Cherche ou commence un nouveau chat" type="text">

            </input>
          </div>


      </div>

      <div className="sidebar__chats">
                {/* <SidebarChat addNewChat/> */}
                {usersData.map(user=> (
                    <SidebarChat key={user._id} id={user._id} name={user.pseudo}/>
                ))}
            </div>
        </div>
  );
}

export default Sidebar;
