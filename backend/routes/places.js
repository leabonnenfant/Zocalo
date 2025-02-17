var express = require('express');
const { all } = require('.');
var router = express.Router();
const Place = require('../models/places');



//Route pour afficher toutes les fav places
router.get('/', function(req, res) {
    Place.find().then(data => {
            if (data) {
                res.json({ result: true, places: data });
            } else {
                res.json({ result: false, error: 'No places found' });
            }
        })
});


router.post('/', async (req, res) => {
Place.findOne({ name: req.body.name })
.then(data => {
  if (!data) {
  const newPlace = new Place({
    placeGoolgeId: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    rating: req.body.rating,
    website: req.body.website,
    openingInfo: req.body.openingHours,
    accessibility: req.body.accessibilityOptions,
  });

  newPlace.save()
  .then(newPlace => {
    res.json({ result: true, place: newPlace });
  });
} else {
    // User already exists in database
    res.json({ result: false, error: 'already exist ✨'});
  }
});
});



// /* GET/ : pour afficher les  places pour chaque city*/
// router.get('/:city', function(req, res) {
//   const city = req.params;

// // Construction des filtres
//   let filters = {};
//   if (city) filters.city = city;

//   Place.find(filters).populate('place').then(places => {
//     if (places.length > 0) {
//       res.json({ result: true, places: data.places });
//     } else {
//       res.json({ result: false, error: 'No places found' });
//     }
//   }).catch(error => {
//     console.error(error);
//     res.status(500).json({ result: false, error: 'Internal server error' });
//   });
// });





// Route pour afficher une place quand on clic desssus
// router.get('/place', (req, res) => {
//     Place.findOne({place: req.params.place}).then(data => {
//       if(data){
//       res.json({result: true, places: data.places});
//       }else {
//         res.json({result: false})
//       }
//     })
//   })

module.exports = router;
