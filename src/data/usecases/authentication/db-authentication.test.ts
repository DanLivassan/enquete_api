import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository, UpdateTokenRepository } from '../../protocols/db'
import { Encrypter, TokenGenerator } from '../../protocols/encrypter'
import { DbAuthentication } from './db-authentication'

interface SutProps {
  sut: DbAuthentication
  loadAccountByEmailRepoStub: LoadAccountByEmailRepository
  hashComparerStub: Encrypter
  tokenGeneratorStub: TokenGenerator
  tokenRepoStub: UpdateTokenRepository
}
const makeSut = (): SutProps => {
  class UpdateTokenRepositoryStub implements UpdateTokenRepository {
    async update (_: string): Promise<void> {

    }
  }
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email): Promise<AccountModel> {
      return await Promise.resolve({ email: 'some@mail.com', id: 'id', name: 'name', password: 'hashed_password' })
    }
  }
  class HashComparerStub implements Encrypter {
    encrypt: (value: string) => Promise<string>
    async checkEncryption (value: string, encryptedValud: string): Promise<boolean> {
      return true
    }
  }

  class TokenGeneratorStub implements TokenGenerator {
    generate (_: string): string {
      return 'my_nice_token'
    }
  }
  const tokenGeneratorStub = new TokenGeneratorStub()
  const loadAccountByEmailRepoStub = new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const tokenRepoStub = new UpdateTokenRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepoStub, hashComparerStub, tokenGeneratorStub, tokenRepoStub)

  return { loadAccountByEmailRepoStub, sut, hashComparerStub, tokenGeneratorStub, tokenRepoStub }
}
describe('DbAuthentication useCase', () => {
  it('should call LoadAccountByEmail repo with correct email', async () => {
    const { loadAccountByEmailRepoStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepoStub, 'load')
    await sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )
    expect(loadSpy).toBeCalledWith('some@mail.com')
  })

  it('should throws if LoadAccountByEmail throw', async () => {
    const { loadAccountByEmailRepoStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepoStub, 'load')
    loadSpy.mockRejectedValueOnce(new Error('some error'))

    await expect(sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )).rejects.toThrowError(Error('some error'))
  })

  it('should call hashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'checkEncryption')
    await sut.auth({ email: 'some@mail.com', password: 'password' })
    expect(compareSpy).toBeCalledWith('password', 'hashed_password')
  })

  it('should throws if hashComparer throw', async () => {
    const { hashComparerStub, sut } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparerStub, 'checkEncryption')
    hashComparerSpy.mockRejectedValueOnce(new Error('some error'))

    await expect(sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )).rejects.toThrowError(Error('some error'))
  })

  it('should return null if Hashcompare returns false', async () => {
    const { hashComparerStub, sut } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparerStub, 'checkEncryption')
    hashComparerSpy.mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const resp = await sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )
    expect(resp).not.toBeTruthy()
  })

  it('should generate a token', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    await sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )
    expect(tokenGeneratorSpy).toBeCalled()
  })

  it('should throws if hashComparer throw', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    tokenGeneratorSpy.mockImplementationOnce(() => { throw Error('some error') })
    await expect(sut.auth({ email: 'some@mail.com', password: 'password' })).rejects.toThrow()
  })

  it('should update token on repository', async () => {
    const { tokenRepoStub, sut } = makeSut()
    const updateSpy = jest.spyOn(tokenRepoStub, 'update')

    await sut.auth({ email: 'some@mail.com', password: 'password' })
    expect(updateSpy).toBeCalledWith('id', 'my_nice_token')
  })
})
