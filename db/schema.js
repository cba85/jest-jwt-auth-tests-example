import Database from "better-sqlite3";

const db = new Database("./database.db");
db.pragma("journal_mode = WAL");

const createTable = db.prepare(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
  )`);
createTable.run();
