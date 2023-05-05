import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../../../main/config/env'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt adapter', () => {
  it('on encrypt should call sign with correct values', async () => {
    const sut = new JwtAdapter()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('anyId')
    expect(signSpy).toHaveBeenCalledWith({ id: 'anyId' }, JWT_TOKEN)
  })
  it('on encrypt should return the token genereted', async () => {
    const sut = new JwtAdapter()
    const signSpy = jest.spyOn(jwt, 'sign')
    signSpy.mockReturnValueOnce('my_generetate_token' as any)
    const resp = await sut.encrypt('anyId')
    expect(resp).toEqual('my_generetate_token')
  })
})
