require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const { mongoose } = require('mongoose');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

// connect database
connectDB();

// create schema
const schema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true
  }
});
const Url = mongoose.model('Url', schema);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// check if url is valid
function isValidUrl(urlString) {
  let url;
  try { 
    url = new URL(urlString); 
  } catch(e) { 
    return false; 
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

// Your first API endpoint

// handle post url
app.post('/api/shorturl', function (req, res) {
  const url = req.body.url;

  if (isValidUrl(url)) {
    console.log(url);
  } else {
    res.json({ 'error': 'invalid url' })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
