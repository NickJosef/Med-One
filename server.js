const mysql = require("mysql");

require("dotenv").config({ path: "./config/config.env" });

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("DB is connected");
});

module.exports = con;
