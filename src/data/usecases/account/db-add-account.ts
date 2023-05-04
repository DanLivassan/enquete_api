import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel, AddAccountUseCase } from '../../../domain/usecases/add-account'
import { AddAccountRepo } from '../../protocols/db/add-account-repo'
import { Encrypter } from '../../protocols/encrypter/encrypter'

export class DbAddAccount implements AddAccountUseCase {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepo: AddAccountRepo) { }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return await this.addAccountRepo.add({ ...account, password: hashedPassword })
  }
}
