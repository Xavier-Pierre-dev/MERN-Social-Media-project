//socket
import io from "socket.io-client";

import { Avatar, IconButton } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import AttachFile from "@material-ui/icons/AttachFile";
import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

//import db from './firebase';
//import firebase from 'firebase';
import {useParams} from "react-router-dom";
//import {useStateValue} from "./StateProvider";
import { useDispatch, useSelector } from "react-redux";

import { getRoom, addRoom, addMessage } from "./../../actions/room_conversation.actions";
import { UidContext } from "../AppContext";
import { isEmpty, timestampParser } from "../Utils";

let socket;

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const {member_2Id}=useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  //const [{user}, dispatch] = useStateValue();
  const usersData = useSelector((state) => state.usersReducer);
  const room_conversation = useSelector((state)=>state.room_conversationReducer);

  const [data, setData] = useState({});
  const [RoomId, setRoomId] = useState();

  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  const [updateMessage, setupdateMessage] = useState(true);
  const [randActual, setrandActual] = useState(2);

  
  
  //Socket Part----------------------------------
  //Socket Part----------------------------------
  //Socket Part----------------------------------
  //connection sur le port du server 
  useEffect(() => {
    //console.log(`${process.env.REACT_APP_API_URL}`);
    socket = io(`${process.env.REACT_APP_API_URL}`,{
      withCredentials:true,
    });
  }, [`${process.env.REACT_APP_API_URL}`]);

  //receive socket message
  useEffect(() => {
    receiveMessage_Socket();
  });

  const receiveMessage_Socket = async () => {
    //if(From_Socket!==true){
      //socket.on(RoomId, (data) => {
      socket.on(`receive_message : ${RoomId}`, (data) => {
        //console.log("receive a msg from : ", data.author, " dans la room :", RoomId);
        //console.log(data);
        if(data.random!==randActual){
          setrandActual(data.random);
          //dispatch(getRoom(RoomId, 1));
        }
        
/*         if(uid===data.author){
          //console.log("I'm the sender so i do nothing");
          if(data.random!==randActual){
          setrandActual(data.random);
          }
        }
        else{
          //console.log("le message m'est destinée :", data);
          if(data.random!==randActual){
            setrandActual(data.random);
            //dispatch(getRoom(RoomId, 1));
          }

        } */
      });
    //}
  };

  useEffect(()=>{
    dispatch(getRoom(RoomId,1))
  }, [randActual])

  //send socket message
  const sendMessage_Socket = async () => {
    let messageContent = {
      room: RoomId,
      content: {
        author: uid,
        message: "message",
        random: Math.random(),
      },
    };
    console.log("sendmsg msg :", messageContent);
    await socket.emit("send_message", messageContent);

  };

  //connect to the room
  useEffect(()=>{
    socket.emit("join_room", RoomId);
  }, [RoomId])

  //Socket Part----------------------------------
  //Socket Part----------------------------------
  //Socket Part----------------------------------



  useEffect(()=>{
    console.log(1);
      if(member_2Id){
        usersData.forEach(user => {
          if(user._id===member_2Id){
            setRoomName(user.pseudo);
            setData({
              "name_room": "Nom room",
              "membres_ID": [uid,member_2Id]
            })
            
          }
        });
        setupdateMessage(true);

      }
  },[member_2Id])

  useEffect(()=>{
    console.log(2);
    if(updateMessage===true){
      dispatch(addRoom(data));
    }
    setupdateMessage(false);   

  }, [data])

  useEffect(()=>{
    console.log(3);
    setMessages([room_conversation["messages"]]);
    setRoomId(room_conversation["_id"]);
    console.log(6);


  }, [room_conversation])

  useEffect(()=>{
    document.getElementsByClassName('chat__body')[0].scrollTo(0, document.getElementsByClassName('chat__body')[0].scrollHeight);
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(4);
    if(input!==""){
      usersData.forEach(user => {
        if(user._id===uid){
          dispatch(addMessage(RoomId, uid, input, user.pseudo));
          sendMessage_Socket();
        }
      });
    }

    setInput("");
    setupdateMessage(true);
    console.log(5);
}


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div className="chat__headerInfo">
        <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        {/* Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()} */}
                    </p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <Search></Search>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
                {!isEmpty(messages[0]) && messages[0].map(message => (
                    <p id={message._id} className={`chat__message ${ message.sender_message_Id === uid && 'chat__receiver'}`}>
                        <span className="chat__name">{message["sender_message_Pseudo"]}</span>
                        {message.text}
                         <span className="chat__timestamp">{timestampParser(message.timestamp)}</span> 
                    </p>

                ))}
            </div>



            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon/>
            </div>
            
        </div>
        

  );
}

export default Chat;
