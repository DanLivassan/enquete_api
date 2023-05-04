import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository, UpdateTokenRepository } from '../../protocols/db'
import { Encrypter, TokenGenerator } from '../../protocols/encrypter'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepo: LoadAccountByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly tokenGenerator: TokenGenerator,
    private readonly tokenRepository: UpdateTokenRepository
  ) { }

  async auth (data: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepo.load(data.email)
    if (account != null) {
      const isValid = await this.encrypter.checkEncryption(data.password, account?.password)
      if (isValid) {
        const token = this.tokenGenerator.generate(account.id)
        await this.tokenRepository.update(account.id, token)
        return token
      }
    }
    return null
  }
}
