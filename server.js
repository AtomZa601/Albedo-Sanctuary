const express = require("express");
const app = express();
const fs = require("fs");
const hostname = "localhost";
const port = 3002;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const moment = require("moment-timezone");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mdt419",
});

con.connect((err) => {
  if (err) throw err;
  else {
    console.log("MySQL connected");
  }
});

const queryDB = (sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result, fields) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

app.post("/regisDB", async (req, res) => {
  let sql = `INSERT INTO userInfo (username, email, password, img) VALUES ("${req.body.username}", "${req.body.email}",  "${req.body.password}", "avatar.png")`;
  let result = await queryDB(sql);
  console.log(result);
  console.log("New record created successfully one");
  return res.redirect("login.html");
});

app.post("/profilepic", (req, res) => {
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "avatar"
  );
  let user = req.cookies.username;

  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let filename = req.file.filename;
    updateImg(user, filename).then(() => {
      console.log(filename);
      res.cookie("img", filename);
      console.log("Change Complete");
      return res.redirect("feed.html");
    });
  });
});

const updateImg = async (username, filen) => {
  let sql = `UPDATE userInfo SET img = '${filen}' WHERE username = '${username}'`;
  let result = await queryDB(sql);
};

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("img");
  console.log("Log out");
  return res.redirect("login.html");
});

app.get("/readPost", async (req, res) => {
  let sql = `SELECT post.username, post.post_description, post.post_time, post.post_id ,COUNT(Likes.post_id) as COUNT FROM post LEFT JOIN Likes on post.post_id = Likes.post_id group by post.post_id;`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json(result);
});
app.post("/Likepost", async (req, res) => {
  let sql = `INSERT INTO Likes set username = '${req.body.username}',post_id ='${req.body.post_id}'`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json();
});
app.post("/Likeshow", async (req, res) => {
  let sql = `SELECT *,COUNT(*) as COUNT from Likes group by post_id;`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json(result);
});

app.post("/writePost", async (req, res) => {
  let getPost = req.body.post;
  let getPostTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  console.log(getPostTime);
  console.log(req.body);
  let sql = `INSERT INTO post (username, post_description, post_time) VALUES ("${req.cookies.username}", "${getPost}", "${getPostTime}")`;
  let result = await queryDB(sql);
  sql = `SELECT username, post_description, post_time FROM post`;
  result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json(result);
});

app.get("/readComment", async (req, res) => {
  let sql = `SELECT username, comment_description FROM post_comment`;
  let result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json(result);
});

app.post("/writeComment", async (req, res) => {
  let getComment = req.body.post_comment;
  console.log(req.body);
  let sql = `INSERT INTO post_comment (username, post_description) VALUES ("${req.cookies.username}", "${getComment}")`;
  let result = await queryDB(sql);
  sql = `SELECT username, comment_description FROM post_comment`;
  result = await queryDB(sql);
  result = Object.assign({}, result);
  res.json(result);
});

app.post("/checkLogin", async (req, res) => {
  let userForm = req.body.username;
  let passForm = req.body.password;
  let sql = `SELECT * FROM userinfo WHERE username = '${userForm}' AND password = '${passForm}'`;
  let result = await queryDB(sql);
  if (result.length == 0) {
    console.log("False");
    return res.redirect("login.html?error=1");
  } else if (userForm == result[0].username && passForm == result[0].password) {
    res.cookie("username", userForm);
    res.cookie("img", result[0].img);
    console.log("Now, You are Log in");
    return res.redirect("feed.html");
  }

  console.log(result);
});

app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/register.html`);
});
