const mongoose = require('mongoose');


const channelJobboardSchema = mongoose.Schema({
    profile: String,
    pseudo: String,
    picture: String,
    message: String,
    date: String,
});


const ChannelJobboard = mongoose.model('channelJobboards', channelJobboardSchema);


module.exports = ChannelJobboard;
