import Database from "better-sqlite3";
import express from "express";

import authenticated from "./src/auth/authenticated.js";
import loginValidation from "./src/validations/login.js";

const app = express();
const port = process.env.PORT || 3000;

const db = new Database("database.db");
db.pragma("journal_mode = WAL");

const token = "azertyuiop"; // fake token

app.use(express.json());

// Hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login
app.post("/auth/login", (req, res) => {
  if (!loginValidation(req.body)) {
    return res.sendStatus(422);
  }

  const user = db
    .prepare(
      "SELECT id, created_at, email, password FROM users WHERE email = :email"
    )
    .get({ email: req.body.email });

  if (!user) {
    return res.sendStatus(401);
  }

  if (!authenticated(req.body.password, user.password)) {
    return res.sendStatus(401);
  }

  return res.status(200).json({ token });
});

// Server
export default app.listen(port, () => {
  //console.log(`http://127.0.0.1:${port}`);
});
