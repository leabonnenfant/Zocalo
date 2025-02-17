const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
 place: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
 title: String,
 image: String,
 description: String,
 skills_needed: [String],
 time_needed: String,
 remote: Boolean,
 isFav: Boolean,
});


const Project = mongoose.model('projects', projectSchema);


module.exports = Project;
