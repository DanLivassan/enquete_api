import { badRequest } from '../../helpers/http.helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocol/http'

export class SignUpController implements Controller {
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
          resolve(badRequest(field))
        })
      }
    }

    return await new Promise((resolve) => {
      resolve({ statusCode: 500, body: 'Internal server error' })
    })
  }
}
