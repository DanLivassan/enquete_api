import { SignUpController } from "./signup";

describe("SignUpController tests", () => {
  test("should be able to create the signUpController", () => {
    const sut = new SignUpController();
    expect(sut).not.toBe(undefined);
  });
  test("should return 400 (bad request) if no name provided", async () => {
    const sut = new SignUpController();
    const resp = await sut.handle({ data: { name: undefined } });
    expect(resp.statusCode).toBe(400);
  });
});
