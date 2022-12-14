
import { InvalidParamError, MissingParamError, ServerError } from '../presentation/errors'
import { UnauthorizedError } from '../presentation/errors/unauthorized-error'
import { HttpResponse } from '../protocol/http'

export const badRequest = (
  paramName: string,
  typeError: 'MissingParam' | 'InvalidParam'
): HttpResponse => {
  if (typeError === 'MissingParam') {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  if (typeError === 'InvalidParam') {
    return {
      statusCode: 400,
      body: new InvalidParamError(paramName)
    }
  }
  throw Error('bad request')
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
