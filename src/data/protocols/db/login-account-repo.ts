import { AccountModel } from '../../../domain/models/account'
import { LoginAccountModel } from '../../../domain/usecases/login-account'

export interface LoginAccountRepo {
  login: (accountModel: LoginAccountModel) => Promise<AccountModel | null>
}
