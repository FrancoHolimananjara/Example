const mysql = require("mysql");

try {
  const db = mysql.createConnection({
    user: "root",
    password: "",
    database: "data_processing",
  });
  db.connect((err) => {
    if (!err) {
      console.log("Connecting to the database is successfull !!");
    }
  });
  module.exports = db;
} catch (error) {
  console.warn(error);
}
