const PoolHelper = require('./pool');
const ResponseHelper = require('../response/response-helper');

class MySQLHelper {
  static getQuery(spName, params) {
    if (params && params.length > 0) {
      const parameters = [];
      params.forEach((element) => {
        if (element === null) {
          parameters.push(`${element}`);
        } else {
          parameters.push(`'${element}'`);
        }
      });

      return `CALL ${spName}(${parameters})`;
    }
    return `CALL ${spName}() `;
  }



  static async getDataSet(spName, params) {
    const query = await this.getQuery(spName, params);
    try {
      let dataSets = null;
      const mysqlResponse = await PoolHelper.query(query);
      if (mysqlResponse && mysqlResponse[0]) {
        dataSets = mysqlResponse[0];
      } else {
        dataSets = [];
      }

      const response = ResponseHelper.create(true, dataSets, null);
      return response;
    } catch (err) {
      const errResponse = ResponseHelper.create(false, null, err);
      return errResponse;
    }
  }

  static async getNonDataSet(spName, params) {
    const query = this.getQuery(spName, params);
    try {
      await PoolHelper.query(query);
      const response = ResponseHelper.create(true, null, null);
      return response;
    } catch (err) {
      const errResponse = ResponseHelper.create(false, null, err);
      return errResponse;
    }
  }

}

module.exports = MySQLHelper;
