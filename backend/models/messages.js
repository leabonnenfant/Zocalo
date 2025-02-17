const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    text: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;
