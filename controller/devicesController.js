const db = require("../server");

const ErrorHandler = require("../utils/ErrorHandler");

exports.getDevices = (req, res, next) => {
  let sqlquery = "select * from devices";

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 202));
    } else {
      res.status(200).json({
        status: "success",
        length: result.length,
        data: result,
      });
    }
  });
};

exports.unusedDevices = (req, res, next) => {
  let sqlquery = "select * from users where status = 0 and parent_id is null";

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 202));
    } else {
      res.status(200).json({
        status: "success",
        length: result.length,
      });
    }
  });
};
