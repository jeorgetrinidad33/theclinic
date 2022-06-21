const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const saltRounds = 10;

// get config vars
dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "reactblog",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/todos", authenticateToken, (req, res) => {
  const id = req.user.id;
  const sqlAll = "SELECT * FROM todos WHERE ownerId = ?";
  db.query(sqlInsert, [id], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/todos", authenticateToken, (req, res) => {
  const id = req.user.id;
  const task = req.body.task;
  const dueDate = req.body.dueDate;
  const isDone = false;

  const sqlInsert =
    "INSERT INTO todos (ownerId, task, dueDate, isDone) VALUES (?, ?, ?, ?)";

  db.query(sqlInsert, [id, task, dueDate, isDone], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/todos/:id", authenticateToken, (req, res) => {
  const todoId = req.params.id;
  const isDone = req.body.isDone;

  const sqlUpdate = "UPDATE todos SET isDone = ? WHERE id = ?";

  db.query(sqlUpdate, [isDone, todoId], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlRegister =
    "INSERT INTO users (name, email, password) VALUES (?,?,?)";

  bcrypt.hash(password, saltRounds, (err, passwordHash) => {
    db.query(sqlRegister, [email, passwordHash], (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedin: true, user: req.session.user });
  } else {
    res.send({ loggedin: false });
  }
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlLogin = "SELECT * FROM users WHERE email = ?";

  db.query(sqlLogin, [email], (err, result) => {
    if (err) {
      res.send({ err: err });
      return;
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          let user = {
            id: result[0].id,
            email: result[0].email,
          };
          const token = generateAccessToken(user);

          res.send(token);
        } else {
          res.send({ message: "Wrong username/password combination." });
        }
      });
    } else {
      res.send({ message: "User doesn't exist." });
    }
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "24h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.listen(3001, () => {
  console.log("running on port 3001");
});
