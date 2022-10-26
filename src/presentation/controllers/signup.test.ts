import { AccountModel } from '../../domain/models/account'
import { AddAccountModel, AddAccountUseCase } from '../../domain/usecases/add-account'
import { EmailValidator } from '../../protocol/email-validator'
import { HttpRequest } from '../../protocol/http'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-errors'
import { ServerError } from '../errors/server-error'
import { SignUpController } from './signup'

const makeAddAccount = (): AddAccountUseCase => {
  class AddAccountUseCaseStub implements AddAccountUseCase {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'validId',
        name: 'validName',
        email: 'validEmail@mail.com',
        password: 'valid_password'
      })
    }
  }
  const addAccount = new AddAccountUseCaseStub()
  return addAccount
}

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidator
  addAccount: AddAccountUseCase
}
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return { sut, emailValidator: emailValidatorStub, addAccount: addAccountStub }
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
  test('should call isValid with the correct email', async () => {
    const { sut, emailValidator } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith('email@email.com')
  })

  test('should return an error 500 if emailValidator throws', async () => {
    const { sut, emailValidator } = makeSut()
    const isValidSpy = jest.spyOn(emailValidator, 'isValid')
    isValidSpy.mockImplementationOnce(() => {
      throw Error('Some error')
    })
    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const resp = await sut.handle(httpRequest)
    expect(resp.statusCode).toBe(500)
    expect(resp.body).toEqual(new ServerError('Internal server error'))
  })

  test('should return 201 if a account is created', async () => {
    const { sut, addAccount } = makeSut()
    const addAccountSpy = jest.spyOn(addAccount, 'add')

    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const resp = await sut.handle(httpRequest)
    expect(resp.statusCode).toBe(201)
    const { email, name, password } = httpRequest.data
    expect(addAccountSpy).toBeCalledWith({ email, name, password })
  })
})
