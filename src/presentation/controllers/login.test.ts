import { AccountModel } from '../../domain/models/account'
import { LoginAccountModel, LoginAccountUseCase } from '../../domain/usecases/login-account'
import { makeLoginValidations } from '../../main/factories/make-login.validations'
import { HttpRequest, HttpResponse } from '../../protocol/http'
import { UnauthorizedError } from '../errors'
import { LoginController } from './login'

interface SutProps {
  sut: LoginController
  loginAccountUseCaseStub: LoginAccountUseCase
}
const makeSut = (): SutProps => {

  class LoginAccountUseCaseStub implements LoginAccountUseCase {
    async login(account: LoginAccountModel): Promise<AccountModel | null> {
      return { email: 'email@mail.com', id: 'id', name: 'name', password: 'password' }
    }
  }

  const loginAccountUseCaseStub = new LoginAccountUseCaseStub()
  const sut = new LoginController(makeLoginValidations(), loginAccountUseCaseStub)

  return { sut, loginAccountUseCaseStub }
}
describe('Login Controller', () => {


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

  test('should return 200 if correct credentials provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      data: {
        email: 'email@mail.com',
        password: '123'
      }
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({ email: 'email@mail.com', id: 'id', name: 'name', password: 'password' })
  })
})
