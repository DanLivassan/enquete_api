import { DbAddAccount } from '../../data/usecases/account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const addAccountRepo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepo)
  return new SignUpController(emailValidator, addAccount)
}
