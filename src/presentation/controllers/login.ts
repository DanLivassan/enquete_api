import { LoginAccountUseCase } from '../../domain/usecases/login-account'
import { badRequest, serverError, unauthorizedError } from '../../helpers/http.helper'
import { EmailValidator } from '../../protocol/email-validator'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'
import { Validation } from '../helpers/validators/validation'

export class LoginController implements Controller {
  constructor(private validationComposite: Validation, private readonly loginUseCase: LoginAccountUseCase) { }
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validationComposite.validate(request.data)
      if (error) return badRequest(error)

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
    return { statusCode: 200, body: authenticatedAccount }
  }
}
