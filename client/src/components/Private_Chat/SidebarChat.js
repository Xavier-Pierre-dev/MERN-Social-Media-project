import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
//import db from "./firebase";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  const dispatch = useDispatch();


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if(id){
      
      // db.collection('room_conversations').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //       setMessages(snapshot.docs.map((doc) => doc.data()))
      //   }) 
    }
}, [id]);

const createChat = () => {};
/*   const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //
      db.collection("rooms").add({
        name: roomName,
      });
    }
  }; */

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      {/* </Link><Link to={`/bonjour`}> */}
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
