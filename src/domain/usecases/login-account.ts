import { AccountModel } from '../models/account'

export interface LoginAccountUseCase {
  login: (account: LoginAccountModel) => Promise<AccountModel | null>
}

export interface LoginAccountModel {
  email: string
  password: string
}
