const mongoose = require('mongoose');


const channelRoomieSchema = mongoose.Schema({
 profile: String,
 pseudo: String,
 picture: String,
 message: String,
 date: String,
});


const ChannelRoomie = mongoose.model('channelRoomies', channelRoomieSchema);


module.exports = ChannelRoomie;