var express = require('express');
var router = express.Router();

const mongoose = require('../models/connection');
// const mongoose = require('mongoose');
const Profile = require('../models/profiles');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');


//------------------------CREATION PROFIL ASSOCIÉ A UN USER  ------------------------//
router.post('/', (req, res) => {
  if (!checkBody(req.body, ['pseudo'])) {
      res.json({ result: false, error: 'Wait, wait, first tell us with what pseudo we should call you!' });
      return;
  } 
  User.findOne({ token: req.body.token })
  .then(user => {
    if (user === null) {
    const newProfile = new Profile({
      // user: user._id,
      pseudo: req.body.pseudo,
      actualLocation: req.body.actualLocation,
      position: req.body.position,
      nationality: req.body.nationality,
      bio: req.body.bio,
      pronouns: req.body.pronouns,
      skills: req.body.skills,
      picture: req.body.picture,
    });

    newProfile.save()
    .then(newDoc => {
      res.json({ result: true, profile: newDoc });
    });
  } else {
      // User already exists in database
      res.json({ result: false, error: 'Sorry my dear, this pseudo is already taken, please choose another one ✨'  });
    }
  });
});



//--------------------MODIFICATION PROFIL-------------------//

router.put("/updateProfile", (req, res) => {
  const { position, pseudo, actualLocation, skills, picture, bio, nationality, pronouns } = req.body;

  let updateFields = {}; // objet de mise à jour
  if (position) updateFields.position = position;
  if (pseudo) updateFields.pseudo = pseudo; // voir comment faire pour qu'ils puissent modifier pseudo
  if (actualLocation) updateFields.actualLocation = actualLocation; 
  if (skills) updateFields.skills = skills;
  if (picture) updateFields.picture = picture;
  if (bio) updateFields.bio = bio;
  if (nationality) updateFields.nationality = nationality;
  if (pronouns) updateFields.pronouns = pronouns;

  //Mise à jour de l'utilisateur : updateOne prend 2 arguments : un filtre { pseudo } pour trouver le profil à mettre à jour et updateFields avec les champs à mettre à jour
  Profile.findOne({ pseudo: { $regex: new RegExp(req.body.pseudo, 'i') } })
    .then((profileFound) => {
    if (!profileFound) {
      return res.json({ result: false, error: "Pseudo not found" });
    } else {
        Profile.updateOne({ pseudo: profileFound.pseudo }, updateFields)
        .then(profileUpdated => {
          console.log("Profile updated successfully:", profileUpdated); // Log pour le cas où le profil est mis à jour avec succès
          return res.json({ result: true, profileUpdated });
        })
        .catch(err => {
          console.error("Error updating profile:", err); // Log pour les erreurs de mise à jour
          return res.status(500).json({ result: false, error: "Error updating profile", details: err });
        });
    }
  })

});

module.exports = router;
