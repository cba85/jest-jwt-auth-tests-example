import bcrypt from "bcryptjs";

function createUserTable(db) {
  const createUserTable = db.prepare(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255)
      )`);

  createUserTable.run();
}

function addTestUser(db) {
  const email = "test@test.com";
  const password = "azertyuiop";

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  const addTestUser = db.prepare(
    `INSERT INTO users (email, password) VALUES (:email, :password)`
  );
  addTestUser.run({ email: email, password: hash });
}

export { addTestUser, createUserTable };
