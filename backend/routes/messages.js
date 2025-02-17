const express = require('express');
const Message = require('../models/messages');

const router = express.Router();

// créer un nouveau message
router.post('/', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(400).send(error);
    }
});



// récupérer  messages entre 2 users
router.get('/messages/:senderId/:receiverId', async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).populate("receiverId").sort({ timestamp: 1 })
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

// récupérer les messages de l'utilisateur connecté
  router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }).populate("receiverId").sort({ timestamp: -1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;