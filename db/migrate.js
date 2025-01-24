import Database from "better-sqlite3";

import { addTestUser, createUserTable } from "./migrations/user.js";

const db = new Database("./database.db");

createUserTable(db);
addTestUser(db);
