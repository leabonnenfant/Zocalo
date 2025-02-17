const mongoose = require('mongoose');


const profileSchema = mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    position: {
        type: String,
        required: false,
        unique: false,
    },
    pseudo: {
        type: String,
        required: true,
        unique: true,
    },
    actualLocation: {
        type: String,
        required: false,
        unique: false,
    },
    skills: [{
        type: String,
        required: false,
        unique: false,
    }],
    picture: {
        type: String,
        required: false,
        unique: false,
    },
    bio: {
        type: String,
        required: false,
        unique: false,
    },
    nationality: {
        type: String,
        required: false,
        unique: false,
    },
    pronouns: {
        type: String,
        required: false,
        unique: false,
    },
    
});


const Profile = mongoose.model('profiles', profileSchema);
module.exports = Profile;
