const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.post('/login',
    UserController.login);

module.exports = router;