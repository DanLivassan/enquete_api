import { badRequest } from '../../helpers/http.helper'
import { EmailValidator } from '../../protocol/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]

    for (const field of requiredFields) {
      if (request.data[field] === undefined) {
        return await new Promise((resolve) => {
          resolve(badRequest(field, 'MissingParam'))
        })
      }
    }
    if (!this.emailValidator.isValid(request.data.email)) {
      return await new Promise((resolve) => {
        resolve(badRequest('email', 'InvalidParam'))
      })
    }
    return await new Promise((resolve) => {
      resolve({ statusCode: 500, body: 'Internal server error' })
    })
  }
}
