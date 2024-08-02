const mongoose = require('mongoose');

// create schema
const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true,
    unique: true
  }
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
