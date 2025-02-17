var express = require('express');
var router = express.Router();
const Project = require('../models/projects');
const { log } = require('console');

// Route pour afficher tous les projets
router.get('/', function(req, res) {
    Project.find().then(data => {
        if (data.length > 0) {
            res.json({ result: true, projects: data });
        } else {
            res.json({ result: false, error: 'No projects found' });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({ result: false, error: 'Internal server error' });
    });
});



module.exports = router;