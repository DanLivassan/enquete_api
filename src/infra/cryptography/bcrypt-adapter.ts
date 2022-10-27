import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const encryptedValue = await bcrypt.hash(value, 10)
    return encryptedValue
  }
}
