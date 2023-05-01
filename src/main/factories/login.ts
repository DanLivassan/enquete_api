import { DbLoginAccount } from '../../data/usecases/account/db-login-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LoginController } from '../../presentation/controllers/login'
import { makeLoginValidations } from './make-login.validations'

export const makeLoginController = (): LoginController => {
  const encrypter = new BcryptAdapter()
  const loginAccountRepo = new AccountMongoRepository()
  const dbLoginAccount = new DbLoginAccount(encrypter, loginAccountRepo)
  const validations = makeLoginValidations()
  return new LoginController(validations, dbLoginAccount)
}
