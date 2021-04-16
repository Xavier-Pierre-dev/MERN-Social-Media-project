const mongoose = require('mongoose');

const room_conversationSchema = new mongoose.Schema(
  {
    name_room:{
      type:String,
      required:true,
    },
    type:{
      type:String,
      require:true,
    },
    membres_ID : { type : Array , required:true },
    //role_membres_ID doit etre un array de role avec 1 role / membre
    role_membres_ID : { type : Array , "default" : [] },
    messages: {
      type: [
        {
          sender_message_Id:String,
          sender_message_Pseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('room_conversation', room_conversationSchema);