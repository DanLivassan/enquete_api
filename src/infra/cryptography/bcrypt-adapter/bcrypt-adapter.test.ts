import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => resolve('hashedvalue'))
  }
}))
interface SutTypes {
  sut: BcryptAdapter
}
const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter()
  return { sut }
}
describe('BcryptAdapter', () => {
  test('should call bcrypt with the correct value and return a hashedvalue', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const { sut } = makeSut()
    const value = await sut.encrypt('initial_value')
    expect(value).toEqual('hashedvalue')
    expect(hashSpy).toBeCalledWith('initial_value', 10)
  })
})
