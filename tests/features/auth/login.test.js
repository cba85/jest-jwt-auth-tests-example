// Login

import request from "supertest";

const url = "http://127.0.0.1:3000";
const endpoint = "/auth/login";

describe("Login", () => {
  test("Login validation fails", async () => {
    const res = await request(url).post(endpoint);

    expect(res.status).toBe(422);
  });

  test("Login success", async () => {
    const res = await request(url)
      .post(endpoint)
      .send({ email: "test@test.com", password: "azertyuiop" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("token");
  });
});
