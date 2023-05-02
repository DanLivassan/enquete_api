import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email.repo'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication useCase', () => {
  it('should call LoadAccountByEmail repo with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email): Promise<AccountModel> {
        return await Promise.resolve({ email: 'some@mail.com', id: 'id', name: 'name', password: 'pass' })
      }
    }
    const loadAccountByEmailRepoStub = new LoadAccountByEmailRepositoryStub()
    const loadSpy = jest.spyOn(loadAccountByEmailRepoStub, 'load')
    const sut = new DbAuthentication(loadAccountByEmailRepoStub)
    await sut.auth(
      { email: 'some@mail.com', password: 'password' }
    )
    expect(loadSpy).toBeCalledWith('some@mail.com')
  })
})
