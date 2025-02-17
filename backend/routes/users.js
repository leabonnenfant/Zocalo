require('../models/connection');
var express = require('express');
var router = express.Router();
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');
const Project = require('../models/projects');


router.get('/fav/:userId', (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
      .then((data) => {
          if (!data) {
              return res.status(404).json({ message: 'User not found' });
          }
          res.json({
              favAnnounce: data.favAnnounce,
              favPlaces: data.favPlaces,
          });
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      });
});


//------------------------INCRIPTION - NEW USER  ------------------------//
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstName', 'lastName', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } })
  .then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        token: uid2(32),
      });

      newUser.save()
      .then(userData => {
        res.json({ result: true, token: userData.token, user : userData });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User with this email already exists!' });
    }
  });
});

router.get('/addPlace/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, canAdd: data.canAdd });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});


//------------------------CONNEXION------------------------//

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } })
  .then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      console.log(data.favPlaces);
      res.json({ result: true, token: data.token, email: data.email, firstName: data.firstName, id: data._id, favAnnounce: data.favAnnounce, favPlaces: data.favPlaces });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

//--------------------MODIFICATION USER-------------------//
router.put("/update", (req, res) => {
  const { email, firstName, lastName, password, favPlaces, favAnnounce } = req.body;

  let updateFields = {}; // objet de mise à jour
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (password) updateFields.password = bcrypt.hashSync(password, 10); // Hacher le mot de passe
  if (favPlaces) updateFields.$push = { favPlaces: favPlaces };
  if (favAnnounce) updateFields.$push = { favAnnounce: favAnnounce };

  //Mise à jour de l'utilisateur : updateOne prend 2 arguments : un filtre { email } pour trouver l'user à mettre à jour et updateFields avec les champs à mettre à jour
  User.findOne({ email })
  //.populate pour lier le "compte' user au prfil et pouvoir tout delete"
  .then((userFound) => {
    if (!userFound) {
      return res.json({ result: false, error: "User not found" });
    } else {
      User.updateOne({ email}, updateFields)
      .then((userUpdated) => {
        return res.json({ result: true, userUpdated });
      }).catch(err => {
        return res.json({ result: false, error: "Error updating user", details: err });
      });
    }
  }).catch(err => {
    return res.json({ result: false, error: "Error finding user", details: err });
  });
});


//--------------------DELETE USER-------------------//

router.delete('/delete', (req, res) => {

  const { email } = req.body

User.findOne({ email }).then((userFound) => {
  if (!userFound) {
      return res.json({ result: false, error: "User not found" })
  } else {
      User.deleteOne({ email })
      .then((userDeleted) => {
          return res.json({ result: true, deletedUser })
      })
  }
})
})

module.exports = router;
