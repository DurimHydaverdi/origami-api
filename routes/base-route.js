const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerConfig = require('../helpers/swagger/swagger-config')

const router = express.Router();


router.use('/user', require('./user-route'));
router.use('/player', require('./player-route'))

router.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerConfig));


module.exports = router;