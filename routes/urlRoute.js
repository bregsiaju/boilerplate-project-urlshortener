const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const { isValidUrl, createRandomString } = require('../utils');

// handle post url
router.post('/shorturl', async (req, res) => {
  const url = req.body.url;

  if (isValidUrl(url)) {
    console.log(url);
    // randomize number
    const shortUrl = createRandomString(6);

    // simpan ke dalam database
    try {
      const saveUrl = await Url.create({
        original_url: url,
        short_url: shortUrl
      })
      console.log(saveUrl);
      // res json
      res.json({
        'original_url': saveUrl.original_url,
        'short_url': saveUrl.short_url
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({ 'error': 'Internal server error' });
    }
  } else {
    res.json({ 'error': 'Invalid URL' })
  }
})

// handle get short url
router.get('/shorturl/:short_url', async (req, res) => {
  try {
    const urlFound = await Url.findOne({ short_url: req.params.short_url });
    if (!urlFound) {
      res.status(404).json({ 'error': 'No short URL found for the given input' });
    } else {
      res.redirect(urlFound.original_url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'error': 'Internal server error' });
  }
})

module.exports = router
