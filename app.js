const express = require('express');
const app = express();
// const ResponseUtil = require('./v1/helpers/response/response-util');
const BaseRoute = require('./routes/base-route');
const bodyParser = require('body-parser');

const ResponseUtil = require('./helpers/response/response-util');

port = process.env.PORT || 4000;
// app.use('/api', BaseRoute);

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     return res.json(err);
//   });
  
  
  // CronServices.executeCronJobs();
  // LocalTestService.executeService();
  
  
  app.use(ResponseUtil.end);
  app.listen(port);
  console.log(`Listening on port  ${port}`);
  
  
  module.exports = app;