const MySQLHelper = require('../helpers/db/mysql');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// const UserModel = require("../models/UserModel");
const ResponseHelper = require("../helpers/response/response-helper");
const Boom = require('@hapi/boom');
const shortid = require('shortid');
// const USER_ROLES = require('../constants/UserRoles');

class UserService {
    static async login(userData) {
        const checkUserIfExists = await this.getUserByEmail(userData.email);
        if (checkUserIfExists.result == true) {
            const isPasswordOk = bcrypt.compareSync(
                userData.password
              );
              if (!isPasswordOk) {
                throw Boom.unauthorized("Wrong password");
              }
            return checkUserIfExists;
        } else {
            throw Boom.badRequest("User does not exists");
        }
    }


    static async getUserByEmail(email) {
        const spName = "USER_BY_EMAIL_GET"
        const params = [email];
        const response = await MySQLHelper.getDataSet(spName, params);
        if (
            response.result == false ||
            (response.result == true && response.data.length == 0)
        ) {
            const userResponse = ResponseHelper.create(false, null, response.error);
            return userResponse;
        }
        const userResponse = ResponseHelper.create(true, response.data[0], null);
        return userResponse;
    }
}

module.exports = UserService;