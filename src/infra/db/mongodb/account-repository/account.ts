import { AddAccountRepo } from '../../../../data/protocols/add-account-repo'
import { LoginAccountRepo } from '../../../../data/protocols/login-account-repo'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { LoginAccountModel } from '../../../../domain/usecases/login-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepo, LoginAccountRepo {
  async add (accountModel: AddAccountModel): Promise<AccountModel> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.insertOne(accountModel)
    const { _id, ...account } = accountModel as any
    return { id: _id.toString(), ...account }
  }

  async login (accountModel: LoginAccountModel): Promise<AccountModel | null> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const accountFound = await accountsCollection.findOne(
      {
        email: accountModel.email

      }
    )
    if (accountFound == null) return null
    const { _id, ...account } = accountFound as any
    return { id: _id.toString(), ...account }
  }
}
