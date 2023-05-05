import { AccountModel } from '../../../domain/models/account'
import { LoginAccountModel } from '../../../domain/usecases/login-account'
import { HashCompare } from '../../protocols/encrypter/encrypter'
import { LoginAccountRepo } from '../../protocols/db/login-account-repo'
import { DbLoginAccount } from './db-login-account'

const accountData = { name: 'name', email: 'email@mail.com', password: 'valid_pass' }
class HashCompareStub implements HashCompare {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }

  async checkEncryption (value: string, encryptedValud: string): Promise<boolean> {
    return true
  }
}

class LoginAccountRepoStub implements LoginAccountRepo {
  async login (accountModel: LoginAccountModel): Promise<AccountModel> {
    return await new Promise(resolve => resolve({ ...accountData, id: 'Id' }))
  }
}

interface SutTypes {
  sut: DbLoginAccount
  encrypterStub: HashCompare
  loginRepo: LoginAccountRepo
}
const makeSut = (): SutTypes => {
  const encrypterStub = new HashCompareStub()
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
    const encryptSpy = jest.spyOn(encrypterStub, 'checkEncryption')
    const accountData = { email: 'email@mail.com', password: 'valid_pass' }
    await sut.login(accountData)
    expect(encryptSpy).toBeCalledWith('valid_pass', 'valid_pass')
  })

  test('should return an object user given right credentials', async () => {
    const { sut } = makeSut()
    const resp = await sut.login({ email: accountData.email, password: accountData.password })
    expect(resp).toEqual({ ...accountData, id: 'Id' })
  })
})
