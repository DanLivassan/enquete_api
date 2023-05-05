import { Encrypter } from '../../../data/protocols/encrypter'
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../../../main/config/env'

export class JwtAdapter implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, JWT_TOKEN)
  }
}
