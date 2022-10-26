import { AccountModel } from '../models/account'

export interface AddAccountUseCase {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

export interface AddAccountModel {
  name: string
  email: string
  password: string
}
