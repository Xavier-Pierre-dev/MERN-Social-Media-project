import {
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    GET_ROOM,
    GET_ALL_ROOM,
  } from "../actions/room_conversation.actions";
  
  const initialState = {};
  export default function postReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ROOM:
        return action.payload;
      case EDIT_MESSAGE:
        return state.map((room_conversation) => {
          if (room_conversation._id === action.payload.messageId) {
            return {
              ...room_conversation,
              messages: room_conversation.messages.map((message) => {
                if (message._id === action.payload.messageId) {
                  return {
                    ...message,
                    text: action.payload.text,
                  };
                } else {
                  return message;
                }
              }),
            };
          } else return room_conversation;
        });
      case DELETE_MESSAGE:
        return state.map((room_conversation) => {
          if (room_conversation._id === action.payload.RoomId) {
            return {
              ...room_conversation,
              messages: room_conversation.messages.filter(
                (message) => message._id !== action.payload.messageId
              ),
            };
          } else return room_conversation;
        });
      case GET_ALL_ROOM:
            return action.payload
        default:
        return state;
    }
  }