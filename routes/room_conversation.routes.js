const router = require('express').Router();
const room_conversation_Controller = require('./../controllers/room_conversation.controller');
const multer = require("multer");
const upload = multer();


//Dans le schéma chaque room correspond à une conversation
router.get('/:id', room_conversation_Controller.readRoom);
router.post('/private', room_conversation_Controller.createRoom_private);





//message
router.patch('/send-message/:id', room_conversation_Controller.sendMessage);
router.patch('/edit-message/:id', room_conversation_Controller.editMessage);
router.patch('/delete-message/:id', room_conversation_Controller.deleteMessage);


module.exports = router;
