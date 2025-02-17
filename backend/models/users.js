const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
    googleId: String,
    favAnnounce: [String],
    favPlaces: [String],
    coordinates: {
    lat : Number ,
    lon : Number,
    logdate: Date,
 }
});


const User = mongoose.model('users', userSchema);

module.exports = User;
