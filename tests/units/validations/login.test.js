import loginValidation from "../../../src/validations/login.js";

describe("Login validations", () => {
  test("Login validation using wrong parameters", () => {
    const parameters = {};
    expect(loginValidation(parameters)).toBe(false);
  });

  test("Login validation using good parameters", () => {
    const parameters = { email: "test@test.com", password: "azertyuiop" };
    expect(loginValidation(parameters)).toBe(true);
  });
});
