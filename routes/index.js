'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');
var Room = require('../models/room');

router.get('/', function(req, res) {
  Room.find({}, function(err, rooms){
    if (err) return res.status(400).send('oops');
    console.log(rooms);
    res.render("index", {rooms: rooms});
  }).populate('items');
});

module.exports = router;
