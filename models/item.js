'use strict';

var mongoose = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  value: {type: Number, required: true},
  description: {type: String},
  createdAt: {type: Date, required: true, default: new Date() }
});

Item = mongoose.model('Item', itemSchema);

module.exports = Item;



// itemSchema.methods.sayValue = function(){
//   console.log(this.value);
// };

// itemSchema.statics.addItem = function(item, cb){
//   var newItem = new Item(item);
//   newItem.save(cb);
// } 

//statics is a method that is on the model

// var userSchema = mongoose.Schema({
//   username: {type: String, required: true, unique: true},
//   password: String
// });
  // phone: {
  //   type: String,
  //   validate: {
  //     validator: function(v) {
  //       return /d{3}-d{3}-d{4}/.test(v);
  //     },
  //     message: '{VALUE} is not a valid phone number!'
  //   }
  // }
  // phone: [{ 
  //   variety: {type: String}
  //   }]  // or can be an array with a String inside [ String ]

