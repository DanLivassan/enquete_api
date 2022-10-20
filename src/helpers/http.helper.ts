import { MissingParamError } from "../presentation/errors/missing-param-errors";
import { HttpResponse } from "../protocol/http";

export const badRequest = (paramName: string): HttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(paramName),
});
