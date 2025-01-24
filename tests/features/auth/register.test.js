// Register

import request from "supertest";
import app from "../../../index.js";

const endpoint = "/auth/register";

describe("Register", () => {
  afterAll(async () => {
    app.close();
  });

  test("Register validation fails", async () => {
    const res = await request(app).post(endpoint);

    expect(res.status).toBe(422);
  });

  test("Register user already exists", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "test@test.com", password: "azertyuiop" });

    expect(res.status).toBe(409);
  });

  test("Register success", async () => {
    const res = await request(app)
      .post(endpoint)
      .send({ email: "test2@test.com", password: "azertyuiop" });

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("token");
  });
});
