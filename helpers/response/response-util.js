const ResponseHelper = require('./response-helper');
exports.end = (data, req, res, next) => {
  if (data.result == false && data.error) {
    if (data.error.isBoom) {
      const boomError = data.error.output.payload;
      const response = ResponseHelper.create(false, null, boomError);
      res.status(boomError.statusCode).json(response);
    } else {
      const response = ResponseHelper.create(false, null, data.error);
      res.status(500).json(response);
    }
  } else {
    res.json(data);
  }
};
