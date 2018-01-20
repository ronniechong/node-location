const express = require('express');
const dotenv = require('dotenv');

const router = express.Router();
dotenv.config();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'My Home',
    message: 'Geolocation',
    gmapApi: process.env.GMAPAPI,
    apiUrl: process.env.GEOLOCATIONADDURL,
    clientId: process.env.GAPPCLIENTID,
  });
});

router.get('/signin', (req, res) => {
  res.render('signin', {
    title: 'My Home',
    message: 'Please sign in to proceed',
    clientId: process.env.GAPPCLIENTID,
  });
});

module.exports = router;
