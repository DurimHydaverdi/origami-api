class ResponseHelper {
  static create(result, data, error) {
    return {
      result,
      data,
      error,
    };
  }

  static createWithExtra(result, data, error, extra) {
    return {
      result,
      data,
      error,
      extra,
    };
  }
}
module.exports = ResponseHelper;

