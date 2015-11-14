'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res){
  Item.find({}, function (err, items) {
    res.status(err ? 400 : 200).send(err || items);
  }).sort({value: -1});
});

// .populate()
// .sort()
// .limit()
// .select()
// .where()

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
  item.save(function(err){
    res.status(err ? 400 : 200).send(err || `${req.body.name} added`);
  })
});


module.exports = router;
// router.put('/', function(req, res){
//   Car.findByIdAndUpdate(req.body._id, req.body, function(err, car){
//       res.send(car);
//   });
// });

// router.put('/', function(req, res){
//   Car.findByIdAndRemove(req.body._id, req.body, function(err, car){
//       res.send(car);
//   });
// });

  // Item.update({_id: req.params.id}, {name: req.body.name, value: req.body.value, description: req.body.description}, function(err, message){
  //   if (err) return res.status(400).send(err);
  //   res.send();
  // });

  // Item.update({_id: req.params.id}, {name: req.body.name, value: req.body.value, description: req.body.description}, function(err, message){
  //   if (err) return res.status(400).send(err);
  //   res.send();
  // });

// router.put('/', function(req, res))
// Item.update([query], [new data], cb)

//post new item
