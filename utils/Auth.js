const jwt = require("jsonwebtoken");
const ErrorHandler = require("./ErrorHandler");
const { promisify } = require("util");
const db = require("../server");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resources", 401));
  }

  const decodeData = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  let sqlquery = `select * from admins where name = "${decodeData.name}" `;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      return (req.user = result[0]);
    }
  });

  next();
};

module.exports = isAuthenticated;
