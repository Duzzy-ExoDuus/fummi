const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  info: [{
    attribute: String, 
    value: Number
    }]
});

module.exports = Data = mongoose.model('dataPacket', DataSchema);