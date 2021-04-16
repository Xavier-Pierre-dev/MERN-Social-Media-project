const PostModel = require("./../models/post.model");
const UserModel = require("./../models/user.model");
const RoomModel = require("./../models/room_conversation.model");
const { uploadErrors } = require("./../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const { json } = require("body-parser");



//router.patch('/send-message/:id', room_conversation_Controller.sendMessage);
// router.patch('/edit-message/:id', postController.editMessage);
// router.patch('/delete-message/:id', postController.deleteMessage);

//2 personne maximum et minimum
module.exports.createRoom_private = async (req, res) => {

  if(req.body.membres_ID === undefined){
    return res
    .status(400)
    .send("erreur : une room ne peut contenir que 2 personne");
  }

  //2 personnes maximum et minimum (obligatoire) pour une room privé
  //2 users required minimum and maximum for ba able to be considered like a private conversation
  if (req.body.membres_ID.length !== 2) {
    return res
      .status(400)
      .send("erreur : une room ne peut contenir que 2 personne");
  }


   if (!ObjectID.isValid(req.body.membres_ID[0])) {
     console.log("test");
     return res.status(400).send("ID unknown : " + req.body.membres_ID[0]);
   }

   if (!ObjectID.isValid(req.body.membres_ID[1])) {
     console.log("test");
     return res.status(400).send("ID unknown : " + req.body.membres_ID[1]);
   }

  

 
  //verifie si les 2 user Id existes
  //check if the 2 users exist
  if (
    (await UserModel.findById(req.body.membres_ID[0]).exec()) !== null &&
    (await UserModel.findById(req.body.membres_ID[1]).exec()) !== null
  ) {

  } 
  else {
    return res.status(400).send("ID unknown :  " + req.body.membres_ID[1]);
  }

  //test if the room already exist ? and if the room exist the function will not create a new room and send the room 
  const room = await RoomModel.find().select();
  try{
    test=room.find(element => (
      (element["membres_ID"][0]===req.body.membres_ID[0] && element["membres_ID"][1]===req.body.membres_ID[1])
      ||
      (element["membres_ID"][0]===req.body.membres_ID[1] && element["membres_ID"][1]===req.body.membres_ID[0])
      ));
    //console.log(test);
    if(test!==undefined){
      //console.log("this room exist already");
      return res.status(201).json(test);
    }
  }catch(err){

  }

  //when a room is private both user of the room will have the same right 
  //the comportement will be the same for each :
  //be able to delete them own message one by one
  const newRoom = new RoomModel({
    name_room: req.body.name_room,
    membres_ID: req.body.membres_ID,
    type : "private",
    role_membres_ID: [],
    messages: [],
  });




  try {
    const room_conversation = await newRoom.save();
    return res.status(201).json(room_conversation);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.readRoom = async (req, res) => {

  RoomModel.findById(req.params.id, (err, docs) => {
  if (!err) res.send(docs);
  else console.log('ID unknow : ' + err);
  });

};

//router.patch('/send-message/:id', room_conversation_Controller.sendMessage);
module.exports.sendMessage = async (req, res) => {

  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID unknown : " + req.params.id);

try {
  return RoomModel.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        messages: {
          sender_message_Id: req.body.sender_message_Id,
          sender_message_Pseudo: req.body.sender_message_Pseudo,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    { new: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      else return res.status(400).send(err);
    }
  );
} catch (err) {
  return res.status(400).send(err);
}
};




// router.patch('/edit-message/:id', room_conversation_Controller.editMessage);
module.exports.editMessage = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return RoomModel.findById(req.params.id, (err, docs) => {
      const theMessage = docs.messages.find((message) =>
        message._id.equals(req.body.messageId)
      );

      if (!theMessage) return res.status(404).send("Message not found");
      theMessage.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }

};

// router.patch('/delete-message/:id', room_conversation_Controller.deleteMessage);
module.exports.deleteMessage = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return RoomModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          messages: {
            _id: req.body.messageId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }

};
