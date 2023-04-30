
import { ServerError } from '../presentation/errors'
import { UnauthorizedError } from '../presentation/errors/unauthorized-error'
import { HttpResponse } from '../protocol/http'

export const badRequest = (
  error: Error
): HttpResponse => {
  return {
    body: { name: error.name, message: error.message },

    statusCode: 400
  }
}

export const serverError = (
  paramName: string
): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(paramName)
  }
}

export const unauthorizedError = (

): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError()
  }
}
