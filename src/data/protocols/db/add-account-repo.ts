import { AccountModel } from '../../../domain/models/account'
import { AddAccountModel } from '../../../domain/usecases/add-account'

export interface AddAccountRepo {
  add: (accountModel: AddAccountModel) => Promise<AccountModel>
}
