import { InvalidParamError } from '../presentation/errors/invalid-param-error'
import { MissingParamError } from '../presentation/errors/missing-param-errors'
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
