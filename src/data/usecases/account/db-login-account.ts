import { AccountModel } from '../../../domain/models/account'
import { LoginAccountModel, LoginAccountUseCase } from '../../../domain/usecases/login-account'
import { Encrypter } from '../../protocols/encrypter'
import { LoginAccountRepo } from '../../protocols/login-account-repo'

export class DbLoginAccount implements LoginAccountUseCase {
  constructor (private readonly encrypter: Encrypter, private readonly loginAccountRepo: LoginAccountRepo) {}

  async login (account: LoginAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    return await this.loginAccountRepo.login({ ...account, password: hashedPassword })
  }
}
