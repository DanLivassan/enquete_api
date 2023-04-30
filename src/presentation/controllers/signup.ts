import { AddAccountUseCase } from '../../domain/usecases/add-account'
import { badRequest, serverError } from '../../helpers/http.helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'
import { Validation } from '../helpers/validators/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAcountUseCase: AddAccountUseCase) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.data)
      if (error != null) { return badRequest(error) }
    } catch (e) {
      return await new Promise((resolve) => {
        resolve(serverError('Internal server error'))
      })
    }
    const { email, name, password } = request.data
    const resp = await this.addAcountUseCase.add({
      email, name, password
    })

    return await new Promise((resolve) => {
      resolve({ statusCode: 201, body: resp })
    })
  }
}
