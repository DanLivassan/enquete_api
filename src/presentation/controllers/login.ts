import { LoginAccountUseCase } from '../../domain/usecases/login-account'
import { badRequest, serverError, unauthorizedError } from '../../helpers/http.helper'
import { EmailValidator } from '../../protocol/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly loginUseCase: LoginAccountUseCase) { }
  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'password',
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
    const authenticatedAccount = await this.loginUseCase.login(request.data)
    if (authenticatedAccount == null) {
      return await new Promise((resolve) => {
        resolve(unauthorizedError())
      })
    }
    return await new Promise((resolve) => {
      resolve({ statusCode: 201, body: 'ok' })
    })
  }
}
