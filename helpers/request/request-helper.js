const {
  validationResult,
} = require('express-validator');
const ResponseHelper = require('../response/response-helper');
const Boom = require('@hapi/boom');

class RequestHelper {
  static validate(req, res, next) {
    const errors = validationResult(req);
    if (errors && errors.errors.length == 0) {
      return next();
    }
    let extractedError = null;

    if (errors.errors && errors.errors.length > 0) {
      extractedError = errors.errors[0].msg;
    }
    const errResponse = ResponseHelper.create(false, null, Boom.badRequest(extractedError));
    next(errResponse);
  }
}
module.exports = RequestHelper;
