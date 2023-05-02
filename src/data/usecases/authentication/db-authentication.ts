import { AccountModel } from '../../../domain/models/account'
import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email.repo'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepo: LoadAccountByEmailRepository) { }
  async auth (data: AuthenticationModel): Promise<AccountModel | null> {
    const account = await this.loadAccountByEmailRepo.load(data.email)
    return account
  }
}
