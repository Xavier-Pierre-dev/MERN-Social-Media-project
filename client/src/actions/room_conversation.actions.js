import axios from "axios";


// rooms
export const ADD_ROOM = "ADD_ROOM";
export const GET_ROOM = "GET_ROOM";
export const GET_ALL_ROOM = "GET_ALL_ROOM";


// messages
export const ADD_MESSAGE = "ADD_MESSAGE";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

export const addRoom = (data) => {

    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/message/private`, data)
        .then((res) => {
          if (res.data.errors) {

          } else {

            
            dispatch({ type: GET_ROOM, payload: res.data });
          }
        });
    };
  };

   export const getRoom = (RoomId, num) => {

     return (dispatch) => {
       return axios
         .get(`${process.env.REACT_APP_API_URL}api/message/${RoomId}`)
         .then((res) => {
           //const array = res.data.slice(0, num);
           dispatch({ type: GET_ROOM, payload: res.data });
           //dispatch({ type: GET_ALL_ROOM, payload: res.data });
         })
         .catch((err) => console.log(err));
    };
   };


  export const addMessage = (RoomId, sender_message_Id, text, sender_message_Pseudo) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/message/send-message/${RoomId}`,
        data: { sender_message_Id, text, sender_message_Pseudo },
      })
        .then((res) => {
          dispatch({ type: GET_ROOM, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const editMessage = (RoomId, messageId, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/message/edit-message/${RoomId}`,
        data: { messageId, text },
      })
        .then((res) => {
          dispatch({ type: EDIT_MESSAGE, payload: { RoomId, messageId, text } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const deleteMessage = (RoomId, messageId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/message/delete-message/${RoomId}`,
        data: { messageId },
      })
        .then((res) => {
          dispatch({ type: DELETE_MESSAGE, payload: { RoomId, messageId } });
        })
        .catch((err) => console.log(err));
    };
  };