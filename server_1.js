const express = require("express");
const app = express();
const hostname = "localhost";
const port = 3306;
const bodyParser = require("body-parser");
const mysql = require("mysql");

// app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ใส่ค่าตามที่เราตั้งไว้ใน mysql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Suksaied1",
  database: "mdt419_q3",
});

con.connect((err) => {
  if (err) throw err;
  else {
    console.log("MySQL connected");
  }
});

let tablename = "q3_user_info";

const queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    // query method
    con.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// create table and add data to database
app.post("/addDB", async (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS q3_user_info (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(50), email VARCHAR(50)";
  let result = await queryDB(sql);
  sql = `INSERT INTO q3_user_info (username, email) VALUES ("${req.body.username}", "${req.body.email}")`;
  result = await queryDB(sql);
  console.log("New record created successfullyone");
  res.end("New record created successfully");
});

// update data
app.post("/updateDB", async (req, res) => {
  let sql = `UPDATE ${tablename} SET email = '${req.body.email}' WHERE username = '${req.body.username}'`;
  let result = await queryDB(sql);
  console.log(result);
  res.end("Record updated successfully");
});

// delete data
app.post("/deleteDB", async (req, res) => {
  let sql = `DELETE FROM ${tablename} WHERE username = '${req.body.username}'`;
  let result = await queryDB(sql);
  console.log(result);
  res.end("Record deleted successfully");
});

// show data
app.get("/showDB", async (req, res) => {
  // let sql = `SELECT * FROM ${tablename}`;
  let sql = `SELECT id, username, email FROM ${tablename}`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  console.log(result);
  res.json(result);
});

app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/`);
});
