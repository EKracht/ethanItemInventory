'use strict';

var express = require('express');
var router = express.Router();

var Room = require('../models/room');
var Item = require('../models/item');

router.get('/', function(req, res){
  Room.find({}).populate('items').exec(function (err, rooms) {
    res.status(err ? 400 : 200).send(err || rooms);
  });
});

router.put('/:roomId/addItem/:itemId', function(req, res) {
  Room.findById(req.params.roomId, function(err, room){ //first find room properly
    if(err) return res.status(400).send(err.message);
    Item.findById(req.params.itemId, function(err, item){ //find item properly
      if(err) return res.status(400).send(err.message);
      if (room.items.indexOf(item._id) !== -1) {
        return res.status(400).send('item already in room');
      }
      room.items.push(item._id); //since we know we have a room and item; push item into room
      room.save(function(err){ //then save room
      res.status(err ? 400 : 200).send(err ? 'item add failed' : 'item added');
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Room.findById(req.params.id, function(err, room){
    res.status(err ? 400 : 200).send(err ? 'room not found' : room);
  });
});

router.put('/:id', (req, res) => {
  Room.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room update failed' : room);
  });
});

router.delete('/:id', (req, res) => {
  Room.findByIdAndRemove(req.params.id, function(err, room) {
    res.status(err ? 400 : 200).send(err ? 'room delete failed' : 'room deleted');
  });
});

router.post('/', function(req, res){
  var room = new Room(req.body);
  room.save(function(err){
    res.status(err ? 400 : 200).send(err || room);
  });
});

module.exports = router;
