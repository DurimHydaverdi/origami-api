const UserService = require('../services/user-service');
const ResponseHelper = require("../helpers/response/response-helper");
const AuthHelper = require("../helpers/auth/auth")

class UserController {
    static async login(req, res, next) {
        try {
            const userData = req.body;
            const user = await UserService.login(userData);
            const tokenResponse = await AuthHelper.createToken({
                id: user.data.id,
                email: user.data.email
            });
            if (!tokenResponse.error && tokenResponse.token) {
                const responseData = {
                    token: tokenResponse.token
                };
                const response = ResponseHelper.create(true, responseData, null);
                next(response);
            } else {
                next(tokenResponse);
            }
        } catch (error) {
            const errResponse = ResponseHelper.create(false, null, error);
            next(errResponse);
        }
    }
}

module.exports = UserController