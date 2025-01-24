import authenticated from "../../../src/auth/authenticated.js";

describe("Password authentication", () => {
  test("Passwords match", () => {
    expect(authenticated("toto", "toto")).toBe(true);
  });

  test("Passwords unmatch", () => {
    expect(authenticated("toto", "tata")).toBe(false);
  });
});
