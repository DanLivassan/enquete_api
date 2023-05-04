import { AccountModel } from '../../../domain/models/account'
import { LoginAccountModel, LoginAccountUseCase } from '../../../domain/usecases/login-account'
import { Encrypter } from '../../protocols/encrypter/encrypter'
import { LoginAccountRepo } from '../../protocols/db/login-account-repo'

export class DbLoginAccount implements LoginAccountUseCase {
  constructor (private readonly encrypter: Encrypter, private readonly loginAccountRepo: LoginAccountRepo) { }

  async login (account: LoginAccountModel): Promise<AccountModel | null> {
    const accountFound = await this.loginAccountRepo.login({ ...account })
    if (accountFound == null) return null
    const passwordIsValid = await this.encrypter.checkEncryption(account.password, accountFound.password)
    return passwordIsValid ? accountFound : null
  }
}
