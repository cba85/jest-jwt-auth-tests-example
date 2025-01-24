import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import express from "express";
import jwt from "jsonwebtoken";

import authenticated from "./src/auth/authenticated.js";
import loginValidation from "./src/validations/login.js";

const app = express();
const port = process.env.PORT || 3000;

const db = new Database("database.db");
db.pragma("journal_mode = WAL");

app.use(express.json());

// Hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Register
app.post("/auth/register", (req, res) => {
  /*
  const emailSchema = z.string().email();
  const passwordSchema = z.string().min(8);

  try {
    emailSchema.parse(req.body.email);
    passwordSchema.parse(req.body.password);
  } catch (error) {
    //console.error(error);
    return res.sendStatus(422);
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  let id;

  try {
    db.prepare(
      "INSERT INTO users (email, password) VALUES (:email, :password)"
    ).run({
      email: req.body.email,
      password: hash,
    });
  } catch (error) {
    // 5. Gérer l'erreur si l'utilisateur existe déjà [409]
    console.error(error);
    return res.sendStatus(409);
  }

  // 7. Create JWT token
  const user = db
    .prepare(
      "SELECT id, created_at, email FROM users WHERE id = last_insert_rowid()"
    )
    .get();

  const token = jwt.sign(user, process.env.JWT_SECRET);


  */

  return res.status(201).json({ token: token });
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

  const authenticated = bcrypt.compareSync(req.body.password, user.password);

  if (!authenticated) {
    return res.sendStatus(401);
  }

  // Create JWT token
  const payload = {
    id: user.id,
    createdAt: user.created_at,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(200).json({ token });
});

// Server
export default app.listen(port, () => {
  if (!process.env.JWT_SECRET) {
    console.error("Please set a environment variable JWT_SECRET");
    process.exit(1);
  }
  //console.log(`http://127.0.0.1:${port}`);
});
