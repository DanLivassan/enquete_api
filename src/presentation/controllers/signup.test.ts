import { EmailValidator } from '../../protocol/email-validator'
import { HttpRequest } from '../../protocol/http'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-errors'
import { SignUpController } from './signup'

const makeSut = (): {
  sut: SignUpController
  emailValidator: EmailValidator
} => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return { sut, emailValidator: emailValidatorStub }
}
describe('SignUpController tests', () => {
  test('should be able to create the signUpController', () => {
    const { sut } = makeSut()
    expect(sut).not.toBe(undefined)
  })
  test('should return 400 (bad request) if some required field not provided', async () => {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]
    const { sut } = makeSut()
    for (const field of requiredFields) {
      let httpRequest: HttpRequest = {
        data: {
          name: 'name',
          email: 'email',
          password: 'password',
          passwordConfirmation: 'password'
        }
      }
      httpRequest = {
        ...httpRequest,
        data: { ...httpRequest.data, [field]: undefined }
      }
      const resp = await sut.handle(httpRequest)
      expect(resp.body).toEqual(new MissingParamError(field))
    }
  })
  test('should return 400 (bad request) if the email is not a valid', async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@invalidemail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const resp = await sut.handle(httpRequest)
    expect(resp.body).toEqual(new InvalidParamError('email'))
  })
})
