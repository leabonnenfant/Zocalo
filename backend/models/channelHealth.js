const mongoose = require('mongoose');


const channelHealthSchema = mongoose.Schema({
    profile: String,
    pseudo: String,
    picture: String,
    message: String,
    date: String,
});


const ChannelHealth = mongoose.model('channelHealths', channelHealthSchema);


module.exports = ChannelHealth;
