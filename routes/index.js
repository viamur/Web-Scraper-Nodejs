const express = require('express');
const router = express.Router();
const parse = require('../parse/parse');
const pdf = require('../parse/savePdf');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Web-Scraper' });
});

router.post('/parse', async (req, res, next) => {
  const { url, indexer } = req.body;
  const data = await parse(url, indexer);
  res.json(data);
});

router.post('/pdf', async (req, res, next) => {
  const { url } = req.body;
  await pdf(url);
  res.download('public/hn.pdf');
});

module.exports = router;
