import { DbLoginAccount } from '../../data/usecases/account/db-login-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LoginController } from '../../presentation/controllers/login'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeLoginController = (): LoginController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const loginAccountRepo = new AccountMongoRepository()
  const dbLoginAccount = new DbLoginAccount(encrypter, loginAccountRepo)
  return new LoginController(emailValidator, dbLoginAccount)
}
