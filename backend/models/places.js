const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    placeGoolgeId: Number,
    name: String,
    phone: String,
    address: String,
    latitude: Number,
    longitude: Number,
    rating: Number,
    website: String,
    openingInfo: String,
    accessibility: Boolean,
    isFav:Boolean,
    }
);

const Place = mongoose.model('places', placeSchema);

module.exports = Place;
