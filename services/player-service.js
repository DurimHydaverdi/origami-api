const shortid = require('shortid');
const MySQLHelper = require("../helpers/db/mysql");
const ResponseHelper = require('../helpers/response/response-helper');


class PlayerService {

    static async addNewPlayer(player) {
        const {
            firstName,
            lastName,
            profileImage,
            country,
            team,
            description,
            profile,
        } = player;

        const id = shortid.generate();
        const spName = "PLAYER_PROFILE_INSERT";

        const params = [id, firstName, lastName, profileImage, country, team, description, profile];

        const response = await MySQLHelper.getDataSet(spName, params);
        if (response.result == false || (response.result == true && response.data.length == 0)) {
            return response;
        }

        const playerResponse = ResponseHelper.create(true, response.data[0], null);
        return playerResponse;

    }

    static async getAllPlayers() {
        const spName = "PLAYERS_PROFILE_GET";
        const params = [];
        const response = await MySQLHelper.getDataSet(spName, params);

        if (response.result == false || response.data.length == 0) {
            return response;
        }

        const playerResponse = ResponseHelper.create(true, response.data, null);
        return playerResponse;
    }

    static async updatePlayer(playerData) {

        const spName = "PLAYER_PROFILE_UPDATE";
        const params = [
             playerData.id,
             playerData.firstName, 
             playerData.lastName, 
             playerData.profileImage, 
             playerData.country,
             playerData.team,
             playerData.description,
             playerData.profile];
       
       const response = await MySQLHelper.getDataSet(spName, params);

        if (response.result == false || (response.result == true && response.data.length == 0)) {
            return response;
        }

        const playerResponse = ResponseHelper.create(true, response.data[0], null);
        return playerResponse;
    }

    static async deletePlayer(playerId) {
        const spName = "PLAYER_BY_ID_DELETE_UPDATE";
        const params = [playerId];
        const response = await MySQLHelper.getNonDataSet(spName, params);
        if (response.result == false) {
            return response;
        }
        const playerResponse = ResponseHelper.create(true, null, null);
        return playerResponse;
    }

    static async getPlayerById(playerId) {
        const spName = "PLAYERS_PROFILE_BY_ID_GET";
        const params = [playerId];
        const response = await MySQLHelper.getDataSet(spName, params);
        if (response.result == false || response.data.length == 0) {
            return response;
        }
    
        const playerResponse = ResponseHelper.create(true, response.data[0], null);
        return playerResponse;
    }
}


module.exports = PlayerService;