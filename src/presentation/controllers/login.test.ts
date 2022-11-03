import { EmailValidator } from '../../protocol/email-validator'
import { HttpRequest, HttpResponse } from '../../protocol/http'
import { LoginController } from './login'

interface SutProps {
  sut: LoginController
}
const makeSut = (): SutProps => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidator = new EmailValidatorStub()
  const sut = new LoginController(emailValidator)

  return { sut }
}
describe('Login Controller', () => {
  test('should return 400 if no credentials provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      data: {
        email: 'email@mail.com'
      }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
