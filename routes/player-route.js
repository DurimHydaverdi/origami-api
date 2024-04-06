const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const PlayerController = require('../controllers/player-controller');
const AuthHelper = require('../helpers/auth/auth');

/**
 * @swagger
 * /api/player/:
 *    post:
 *      security:
 *        - bearerAuth: []  
 *      tags:
 *          - Player
 *      summary: Create a player
 *      description: 
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string 
 *              profileImage:
 *                type: string
 *              country:
 *                type: string
 *              team:
 *                type: string
 *              description:
 *                type: string
 *              profile:
 *                type: string
 *      responses:
 *        200:
 *          description: Get task info back 
 */
router.post('/',
    AuthHelper.isAuthenticated,
    PlayerController.addNewPlayer);

/**
 * @swagger
 * /api/player/:
 *    get:
 *      security:
 *         - bearerAuth: [] 
 *      tags:
 *          - Player
 *      summary: Get all players. 
 *      description: 
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: Get list of all players
 */
router.get('/',
    AuthHelper.isAuthenticated,
    PlayerController.getAllPlayers)

/**
 * @swagger
 * /api/player/:
 *    put:
 *      security:
 *        - bearerAuth: []  
 *      tags:
 *          - Player
 *      summary: Update a player
 *      description: 
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string 
 *              profileImage:
 *                type: string
 *              country:
 *                type: string
 *              team:
 *                type: string
 *              description:
 *                type: string
 *              profile:
 *                type: string
 *      responses:
 *        200:
 *          description: Get player profile back
 */
router.put('/',
    AuthHelper.isAuthenticated,
    PlayerController.updatePlayer);

/**
* @swagger
* /api/player/{id}:
*    delete:
*      security:
*         - bearerAuth: []
*      tags:
*          - Player
*      summary: Remove player by id. 
*      description:
*      consumes:
*        - application/json
*      parameters:
*        - name: id
*          in: path
*          type: "string"
*      responses:
*        200:
*          description: Removed player
*/
router.delete('/:id',
    AuthHelper.isAuthenticated,
    PlayerController.deletePlayer);

/**
 * @swagger
 * /api/player/player-id/{id}:
 *    get:
 *      security:
 *         - bearerAuth: []   
 *      tags:
 *          - Player
 *      summary: Get player by id
 *      description: 
 *      consumes:
 *        - application/json   
 *      parameters:
 *        - name: id 
 *          in: path
 *          type: "string"
 *      responses:
 *        200:
 *          description: 
 */
router.get('/player-id/:id',
    AuthHelper.isAuthenticated,
    PlayerController.getPlayerById);

module.exports = router;