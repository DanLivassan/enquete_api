import { AccountModel } from '../../../domain/models/account'
import { LoginAccountModel } from '../../../domain/usecases/login-account'
import { Encrypter } from '../../protocols/encrypter'
import { LoginAccountRepo } from '../../protocols/login-account-repo'
import { DbLoginAccount } from './db-login-account'

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}

class LoginAccountRepoStub implements LoginAccountRepo {
  async login (accountModel: LoginAccountModel): Promise<AccountModel> {
    return await new Promise(resolve => resolve({ email: 'email', id: 'id', name: 'name', password: '' }))
  }
}

interface SutTypes {
  sut: DbLoginAccount
  encrypterStub: Encrypter
  loginRepo: LoginAccountRepo
}
const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const loginRepo = new LoginAccountRepoStub()
  const sut = new DbLoginAccount(encrypterStub, loginRepo)
  return {
    sut,
    encrypterStub,
    loginRepo
  }
}

describe('Login Account UseCase', () => {
  test('should call call encrypter on login before query db', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = { email: 'email@mail.com', password: 'valid_pass' }
    await sut.login(accountData)
    expect(encryptSpy).toBeCalledWith('valid_pass')
  })

  // test('should add account with encrypted data and return the object', async () => {
  //   const { DbLoginAccount, addAccountRepoStub } = makeSut()
  //   const addSpy = jest.spyOn(addAccountRepoStub, 'add')
  //   const accountData = { name: 'name', email: 'email@mail.com', password: 'valid_pass' }
  //   const resp = await DbLoginAccount.add(accountData)
  //   expect(addSpy).toBeCalledWith({ name: 'name', email: 'email@mail.com', password: 'hashed_value' })
  //   expect(resp.id).toBeTruthy()
  // })
})
