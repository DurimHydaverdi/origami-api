const PlayerService = require('../services/player-service');
const ResponseHelper = require("../helpers/response/response-helper");

class PlayerController {

    static async addNewPlayer(req, res, next) {
        try {
            const player = req.body;
            const createdPlayer = await PlayerService.addNewPlayer(player);
            const response = ResponseHelper.create(true, createdPlayer.data, null);
            next(response);
        } catch (err) {
            const errResponse = ResponseHelper.create(false, null, err);
            next(errResponse);
        }
    }

    static async getAllPlayers(req, res, next) {
        try {
            const players = await PlayerService.getAllPlayers();
            const response = ResponseHelper.create(true, players.data, null);
            next(response);
        } catch (err) {
            const errResponse = ResponseHelper.create(false, null, err);
            next(errResponse);
        }
    }

    static async updatePlayer(req, res, next) {
        try {
            const player = req.body;
            const playerResponse = await PlayerService.updatePlayer(player);
            next(playerResponse);
        } catch (err) {
            const errResponse = ResponseHelper.create(false, null, err);
            next(errResponse);
        }
    }

    static async deletePlayer(req, res, next) {
        try {
            const id = req.params.id;
            const PlayerResponse = await PlayerService.deletePlayer(id);
            next(PlayerResponse);
        } catch (err) {
            const errResponse = ResponseHelper.create(false, null, err);
            next(errResponse);
        }
    }

    static async getPlayerById(req, res, next) {
        try {
            const id = req.params.id;
            const player = await PlayerService.getPlayerById(id);
            const response = ResponseHelper.create(true, player.data, null);
            next(response);
        } catch (err) {
            const errResponse = ResponseHelper.create(false, null, err);
            next(errResponse);
        }
    }

}

module.exports = PlayerController;