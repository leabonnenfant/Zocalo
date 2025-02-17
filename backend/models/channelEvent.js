const mongoose = require('mongoose');


const channelEventSchema = mongoose.Schema({
    profile: String,
    pseudo: String,
    picture: String,
    message: String,
    date: String,
});


const ChannelEvent = mongoose.model('channelEvents', channelEventSchema);


module.exports = ChannelEvent;
