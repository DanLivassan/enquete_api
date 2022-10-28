import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account MongoDB Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({ name: 'name', email: 'email@mail.com', password: 'any_pass' })
    expect(account.name).toBe('name')
    expect(account.email).toBe('email@mail.com')
    expect(account.password).toBe('any_pass')
    expect(account.id).toBeTruthy()
  })
})
