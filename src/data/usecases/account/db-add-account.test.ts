import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'
import { AddAccountRepo } from '../../protocols/db/add-account-repo'
import { Encrypter } from '../../protocols/encrypter/encrypter'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements Encrypter {
  checkEncryption: (value: string, encryptedValud: string) => Promise<boolean>
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_value'))
  }
}

class AddAccountRepoStub implements AddAccountRepo {
  async add (accountModel: AddAccountModel): Promise<AccountModel> {
    return {
      id: 'newId',
      ...accountModel
    }
  }
}
interface SutTypes {
  dbAddAccount: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepoStub: AddAccountRepo
}
const makeSut = (): SutTypes => {
  const addAccountRepoStub = new AddAccountRepoStub()
  const encrypterStub = new EncrypterStub()
  const dbAddAccount = new DbAddAccount(encrypterStub, addAccountRepoStub)
  return {
    dbAddAccount,
    encrypterStub,
    addAccountRepoStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('should call encrypter on save', async () => {
    const { dbAddAccount, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = { name: 'name', email: 'email@mail.com', password: 'valid_pass' }
    await dbAddAccount.add(accountData)
    expect(encryptSpy).toBeCalledWith('valid_pass')
  })

  test('should add account with encrypted data and return the object', async () => {
    const { dbAddAccount, addAccountRepoStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepoStub, 'add')
    const accountData = { name: 'name', email: 'email@mail.com', password: 'valid_pass' }
    const resp = await dbAddAccount.add(accountData)
    expect(addSpy).toBeCalledWith({ name: 'name', email: 'email@mail.com', password: 'hashed_value' })
    expect(resp.id).toBeTruthy()
  })
})
