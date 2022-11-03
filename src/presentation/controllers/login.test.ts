import { EmailValidator } from '../../protocol/email-validator'
import { HttpRequest, HttpResponse } from '../../protocol/http'
import { InvalidParamError } from '../errors'
import { LoginController } from './login'

interface SutProps {
  sut: LoginController
  emailValidator: EmailValidator
}
const makeSut = (): SutProps => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidator = new EmailValidatorStub()
  const sut = new LoginController(emailValidator)

  return { sut, emailValidator }
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
  test('should return 400 if email is not valid', async () => {
    const { sut, emailValidator } = makeSut()

    const isValidSpy = jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      data: {
        email: 'email@mail.com',
        password: '123'
      }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalled()
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
