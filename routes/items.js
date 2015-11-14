'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res){
  Item.find({}, function (err, items) {
    res.status(err ? 400 : 200).send(err || items);
  }).sort({value: -1});
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id, function(err, item){
    res.status(err ? 400 : 200).send(err ? 'item not found' : item);
  });
});

router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item) {
    res.status(err ? 400 : 200).send(err ? 'item update failed' : item);
  });
});

router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    res.status(err ? 400 : 200).send(err ? 'item delete failed' : 'item deleted');
  });
});

router.post('/', function(req, res){
  var item = new Item(req.body);
  console.log('item in route', item);
  item.save(function(err){
    res.status(err ? 400 : 200).send(err || item);
  })
});


module.exports = router;
