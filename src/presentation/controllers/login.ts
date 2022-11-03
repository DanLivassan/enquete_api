import { badRequest, serverError } from '../../helpers/http.helper'
import { EmailValidator } from '../../protocol/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) { }
  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email'
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
    } catch (e) {
      return await new Promise((resolve) => {
        resolve(serverError('Internal server error'))
      })
    }

    return await new Promise((resolve) => {
      resolve({ statusCode: 201, body: 'ok' })
    })
  }
}
