import { AddAccountRepo } from '../../../../data/protocols/add-account-repo'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepo {
  async add (accountModel: AddAccountModel): Promise<AccountModel> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.insertOne(accountModel)
    const { _id, ...account } = accountModel as any
    return { id: _id.toString(), ...account }
  }
}
