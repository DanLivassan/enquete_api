import { AccountModel } from '../../domain/models/account'
import { LoginAccountModel, LoginAccountUseCase } from '../../domain/usecases/login-account'
import { EmailValidator } from '../../protocol/email-validator'
import { HttpRequest, HttpResponse } from '../../protocol/http'
import { InvalidParamError, UnauthorizedError } from '../errors'
import { LoginController } from './login'

interface SutProps {
  sut: LoginController
  emailValidator: EmailValidator
  loginAccountUseCaseStub: LoginAccountUseCase
}
const makeSut = (): SutProps => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  class LoginAccountUseCaseStub implements LoginAccountUseCase {
    async login (account: LoginAccountModel): Promise<AccountModel | null> {
      return { email: 'email@mail.com', id: 'id', name: 'name', password: 'password' }
    }
  }
  const emailValidator = new EmailValidatorStub()
  const loginAccountUseCaseStub = new LoginAccountUseCaseStub()
  const sut = new LoginController(emailValidator, loginAccountUseCaseStub)

  return { sut, emailValidator, loginAccountUseCaseStub }
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

  test('should return 401 if wrong credentials provided', async () => {
    const { sut, loginAccountUseCaseStub } = makeSut()

    const loginSpy = jest.spyOn(loginAccountUseCaseStub, 'login').mockResolvedValueOnce(null)
    const httpRequest: HttpRequest = {
      data: {
        email: 'email@mail.com',
        password: '123'
      }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(loginSpy).toBeCalled()
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
})
