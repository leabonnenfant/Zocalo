var express = require('express');
var router = express.Router();

const ChannelEvent = require('../models/channelEvent');
const ChannelHealth = require('../models/channelHealth');
const ChannelJobboard = require('../models/channelJobboard');
const ChannelRoomies = require('../models/channelRoomies');

    router.get('/event', (req, res) => {
        ChannelEvent.findOne().sort({ date: -1 }).then(data => {
            if (data) {
                res.json({
                    pseudo: data.pseudo,
                    message: data.message,
                    date: data.date
                });}});
            })

    //tous les messages
        router.get('/eventall', function(req, res) {
            ChannelEvent.find().then(data => {
                if (data.length > 0) {
                    res.json({ result: true, projects: data });
                } else {
                    res.json({ result: false, error: 'No eventmessage found' });
                }
            }).catch(error => {
                console.error(error);
                res.status(500).json({ result: false, error: 'Internal server error' });
            });
        });
            

    router.get('/health', (req, res) => {
        ChannelHealth.findOne().sort({ date: -1 }).then(data => {
            if (data) {
                res.json({
                    pseudo: data.pseudo,
                    message: data.message,
                    date: data.date
                });}});
            })
    
    router.get('/jobs', (req, res) => {
        ChannelJobboard.findOne().sort({ date: -1 }).then(data => {
            if (data) {
                res.json({
                    pseudo: data.pseudo,
                    message: data.message,
                    date: data.date
                });}});
            })


    router.get('/roomies', (req, res) => {
        ChannelRoomies.findOne().sort({ date: -1 }).then(data => {
            if (data) {
                res.json({
                    pseudo: data.pseudo,
                    message: data.message,
                    date: data.date
                });}});
            })


           

            module.exports = router; 