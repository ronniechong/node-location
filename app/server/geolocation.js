const express = require('express');
const bodyParser = require('body-parser');
const Store = require('./store');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const store = new Store();
/* eslint-disable */
const asyncMiddleware = (fn) =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
/* eslint-enable */

router.post('/add', asyncMiddleware((req, res) => {
  const params = {
    lat: req.body.lat,
    long: req.body.long,
    userid: req.body.userid,
    email: req.body.email,
  };
  try {
    store
      .add(params)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send({
      status: 500,
      msg: err,
    });
  }
}));

module.exports = router;
