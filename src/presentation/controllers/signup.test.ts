import { MissingParamError } from "../errors/missing-param-errors";
import { SignUpController } from "./signup";

describe("SignUpController tests", () => {
  test("should be able to create the signUpController", () => {
    const sut = new SignUpController();
    expect(sut).not.toBe(undefined);
  });
  test("should return 400 (bad request) if no name provided", async () => {
    const sut = new SignUpController();
    const resp = await sut.handle({
      data: { name: undefined, email: "email" },
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual(new MissingParamError("name"));
  });

  test("should return 400 (bad request) if no email provided", async () => {
    const sut = new SignUpController();
    const resp = await sut.handle({ data: { email: undefined, name: "name" } });
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual(new MissingParamError("email"));
  });
});
