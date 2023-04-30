import { AccountModel } from '../../domain/models/account'
import { AddAccountModel, AddAccountUseCase } from '../../domain/usecases/add-account'
import { badRequest } from '../../helpers/http.helper'
import { HttpRequest } from '../../protocol/http'
import { MissingParamError } from '../errors/missing-param-errors'
import { Validation } from '../helpers/validators/validation'
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: SignUpController
  addAccount: AddAccountUseCase
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()

  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(validationStub, addAccountStub)
  return { sut, addAccount: addAccountStub, validationStub }
}

describe('SignUpController tests', () => {
  test('should be able to create the signUpController', () => {
    const { sut } = makeSut()
    expect(sut).not.toBe(undefined)
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

  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    await sut.handle(httpRequest)

    expect(validateSpy).toBeCalledWith(httpRequest.data)
  })

  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('some field'))

    const httpRequest: HttpRequest = {
      data: {
        name: 'name',
        email: 'email@email.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const response = await sut.handle(httpRequest)

    expect(response).toEqual(badRequest(new MissingParamError('some field')))
  })
})
