const express = require('express');

const router = express.Router();

const apiSkeleton = require('../../utils/api-helpers');
const env = require('../../../config/env');
const QueryRecord = require('../../db/models/QueryRecord');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/search', (req, res) => {
  const query = req.query.q;
  const page = req.query.offset;

  // Check for query parameter from URL
  if (!query) {
    res.send('Please enter a search query to get image results!');
  }

  // Set up Pixabay URL with a default offset of 1
  const url = `https://pixabay.com/api/?key=${
    env.PIXABAY_API_KEY
  }&q=${query}&page=${page || 1}`;

  // URL, Snippet, Thumbnail, Context
  apiSkeleton(url, { method: 'GET' })
    .then((data) => {
      const searchResults = data.hits.map(image => ({
        id: image.id,
        url: image.pageURL,
        thumbnail: image.previewURL,
        tags: image.tags,
        views: image.views,
        downloads: image.downloads
      }));

      QueryRecord.create({
        term: query,
        time: Date.now(),
        results: data.totalHits
      }).catch((err) => {
        throw err;
      });

      res.json({ searchResults });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get('/latest', (req, res) => {
  QueryRecord.find({})
    .limit(20)
    .select('term time results -_id')
    .exec((err, records) => {
      if (err) res.send(err);
      res.json(records);
    });
});

module.exports = router;
