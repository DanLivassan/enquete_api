import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../interfaces/controller";

export class SignUpController implements Controller {
  constructor() {}
  handle(request: HttpRequest): Promise<HttpResponse> {
    const { name } = request.data;
    if (!name)
      return new Promise((resolve) => {
        resolve({ statusCode: 400 });
      });
    return new Promise((resolve) => {
      resolve({ statusCode: 500 });
    });
  }
}
