const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const UserController = require('../controllers/user-controller');

/**
 * @swagger
 * /api/user/login:
 *    post:
 *      tags:
 *          - User
 *      summary: Login User.
 *      description: 
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string 
 *      responses:
 *        200:
 *          description: Get User profile and token 
 */
router.post('/login',
    UserController.login);

module.exports = router;