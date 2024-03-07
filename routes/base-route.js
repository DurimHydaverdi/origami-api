const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


router.use('/user', require('./user-route'));

module.exports = router;