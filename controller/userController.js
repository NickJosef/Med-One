const db = require("../server");

const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter valid Email and Password", 202));
  }

  let sqlquery = `select * from admins where email = "${email}"`;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      let isPasswordMatched = bcrypt.compareSync(password, result[0].password);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Email and Password is Invalid", 202));
      }

      const token = jwt.sign({ name: result[0].name }, process.env.SECRET_KEY, {
        expiresIn: process.env.SECRET_EXPIRE,
      });

      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
          ),
          domain: '.herokuapp.com',
          httpOnly: true,
          path: '/'
          secure: req.secure || req.headers["x-forwarded-proto"] === "https",
          signed: true,
        })
        .json({
          status: "success",
          data: result,
        });
    }
  });
};

exports.getParent_User = (req, res, next) => {
  let sqlquery =
    "select profile_img, first_name, last_name, user_id, email, phone_no, date_of_birth, gender, created_at, device_id from users where parent_id is null";

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

exports.getSub_User = (req, res, next) => {
  let sqlquery = "select * from users where parent_id is not null";

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

exports.logout = (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.status(200).json({
    status: "success",
    message: "Successfully Logout",
  });
};

exports.getUserData = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Without ID you can't continue", 400));
  }

  let sqlquery = `select user_id, profile_img, first_name, last_name, user_id, email, phone_no, date_of_birth, gender, created_at from users where user_id = "${id}" `;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      res.status(200).json({
        status: "success",
        data: result[0],
      });
    }
  });
};

exports.currentSubUsers = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Without ID you can't continue", 400));
  }

  let sqlquery = `select profile_img, first_name, last_name, user_id, email, phone_no, date_of_birth, gender, created_at from users where parent_id = "${id}"`;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};

exports.filtering = (req, res, next) => {
  const { keyword } = req.query;

  let sqlquery = `SELECT user_id, first_name, last_name, email, date_of_birth, phone_no, gender, created_at FROM a0to3z5f_medical.users WHERE CONCAT_WS(user_id, first_name, email, phone_no, date_of_birth) LIKE "%${keyword}%" AND parent_id IS NULL`;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
};
