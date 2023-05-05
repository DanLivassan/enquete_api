import { UpdateTokenRepository } from '../../../../data/protocols/db'
import { AddAccountRepo } from '../../../../data/protocols/db/add-account-repo'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email.repo'
import { LoginAccountRepo } from '../../../../data/protocols/db/login-account-repo'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { LoginAccountModel } from '../../../../domain/usecases/login-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepo, LoginAccountRepo, LoadAccountByEmailRepository, UpdateTokenRepository {
  async update (accountId: string, token: string): Promise<void> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.findOneAndUpdate({ $where: { id: accountId } }, { token })
  }

  async load (email: string): Promise<AccountModel | null> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const accountModel = await accountsCollection.findOne({ $where: { email } })
    if (accountModel == null) return null
    const { _id, ...account } = accountModel as any
    return { id: _id.toString(), ...account }
  }

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
