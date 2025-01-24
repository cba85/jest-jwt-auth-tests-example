// Login

import request from "supertest";
import app from "../../../index.js";

const endpoint = "/auth/login";

describe("Login", () => {
  afterAll(() => {
    app.close();
  });

  test("Login validation fails", async () => {
    const res = await request(app).post(endpoint);

    expect(res.status).toBe(422);
  });

  test("Login user does not exist", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "toto@test.com", password: "azertyuiop" });

    expect(res.status).toBe(401);
  });

  test("Login user using incorrect password", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "toto@test.com", password: "Pookiem34*" });

    expect(res.status).toBe(401);
  });

  test("Login success", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "test@test.com", password: "azertyuiop" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("token");
  });
});
