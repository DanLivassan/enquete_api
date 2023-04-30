import { DbAddAccount } from '../../data/usecases/account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { makeSignUpValidations } from './make-sign-up.validations'

export const makeSignUpController = (): SignUpController => {
  const encrypter = new BcryptAdapter()
  const addAccountRepo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepo)
  const validationComposite = makeSignUpValidations()
  return new SignUpController(validationComposite, addAccount)
}
