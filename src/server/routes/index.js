const express = require('express');
const router = express.Router();

const apiSkeleton = require('../../utils/api-helpers');
const env = require('../../config/env');
const QueryRecord = require('../../db/models/QueryRecord');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/search', (req, res) => {
  const query = req.query.q;
  const page = req.query.offset;

  if (!query) {
    res.send('Please enter a search query to get image results!');
  }

  const url = `https://pixabay.com/api/?key=${
    env.PIXABAY_API_KEY
  }&q=${query}&page=${page || 1}`;

  // URL, Snippet, Thumbnail, Context
  apiSkeleton(url, { method: 'GET' })
    .then(data => {
      const searchResults = data.hits.map(image => {
        return {
          id: image.id,
          url: image.pageURL,
          thumbnail: image.previewURL,
          tags: image.tags,
          views: image.views,
          downloads: image.downloads
        };
      });

      QueryRecord.create({
        term: query,
        time: new Date(),
        results: data.totalHits
      }).catch(err => {
        throw err;
      });

      res.json({ searchResults });
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
