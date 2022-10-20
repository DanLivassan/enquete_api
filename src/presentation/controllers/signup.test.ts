import { HttpRequest } from "../../protocol/http";
import { MissingParamError } from "../errors/missing-param-errors";
import { SignUpController } from "./signup";

describe("SignUpController tests", () => {
  test("should be able to create the signUpController", () => {
    const sut = new SignUpController();
    expect(sut).not.toBe(undefined);
  });
  test("should return 400 (bad request) if some required field not provided", async () => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];
    const sut = new SignUpController();
    for (const field of requiredFields) {
      let httpRequest: HttpRequest = {
        data: {
          name: "name",
          email: "email",
          password: "password",
          passwordConfirmation: "password",
        },
      };
      httpRequest = {
        ...httpRequest,
        data: { ...httpRequest.data, [field]: undefined },
      };
      const resp = await sut.handle(httpRequest);
      expect(resp.body).toEqual(new MissingParamError(field));
    }
  });
});
