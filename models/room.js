'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room;

var roomSchema = Schema({
  name: {type: String, required: true},
  createdAt: {type: Date, required: true, default: new Date() },
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

Room = mongoose.model('Room', roomSchema);

module.exports = Room;





