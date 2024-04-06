const jwt = require("jsonwebtoken");
const ResponseHelper = require("../response/response-helper.js");
const UserService = require('../../services/user-service');
const USER_ROLES = require('../../constants/user-roles');

class AuthHelper {
    static async createToken(userData) {
        try {
            const token = jwt.sign({
                id: userData.id,
                email: userData.email
            }, "origami", {expiresIn: '7d'});
            return {token, error: null};
        } catch (e) {
            return {token: null, error: "Error while creating token"};
        }
    }

    static async isAuthenticated(req, res, next) {
        const token = req.headers["authorization"] || req.headers["Authorization"];
        if (!token) {
            const response = ResponseHelper.create(false, null, "No token provided");
            return res
                .status(401)
                .json(response);
        } else {
            jwt.verify(token, "origami", (err, decoded) => {
                if (err) {
                    const errResponse = ResponseHelper.create(false, null, "Token Expired.");
                    return res
                        .status(401)
                        .json(errResponse);
                }
                req.userId = decoded.id;
                req.user = decoded;
                next();
            });
        }
    }

    static async isAdminAuthenticated(req, res, next) {
        const token = req.headers["authorization"] || req.headers["Authorization"];
        if (!token) {
            const response = ResponseHelper.create(false, null, "No token provided");
            return res
                .status(401)
                .json(response);
        } else {
            jwt.verify(token, "origami", async(err, decoded) => {
                if (err) {
                    const errResponse = ResponseHelper.create(false, null, "Token Expired.");
                    return res
                        .status(401)
                        .json(errResponse);
                }

                const admin = await UserService.getUserById(decoded.id);
                if (admin.result === true && (admin.data && admin.data.role !== USER_ROLES.ADMIN)) {
                    const errResponse = ResponseHelper.create(false, null, 'Unauthorized Request');
                    return res
                        .status(401)
                        .json(errResponse);
                }

                req.userId = decoded.id;
                req.user = decoded;
                next();
            });
        }
    }
}

module.exports = AuthHelper;
