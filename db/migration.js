import bcrypt from "bcryptjs";
import Database from "better-sqlite3";

const db = new Database("./database.db");
db.pragma("journal_mode = WAL");

const createUserTable = db.prepare(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
  )`);
createUserTable.run();

const password = "azertyuiop";
const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(password, salt);

const addTestUser = db.prepare(
  `INSERT INTO users (email, password) VALUES (:email, :password)`
);
addTestUser.run({ email: "test@test.com", password: hash });
