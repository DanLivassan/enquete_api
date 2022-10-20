import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../interfaces/controller";

export class SignUpController implements Controller {
  constructor() {}
  handle(request: HttpRequest): Promise<HttpResponse> {
    const { name, email } = request.data;
    if (!name)
      return new Promise((resolve) => {
        resolve({ statusCode: 400, body: "Missing param: name" });
      });
    if (!email)
      return new Promise((resolve) => {
        resolve({ statusCode: 400, body: "Missing param: email" });
      });
    return new Promise((resolve) => {
      resolve({ statusCode: 500, body: "Internal server error" });
    });
  }
}
