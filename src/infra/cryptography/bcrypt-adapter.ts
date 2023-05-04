import { Encrypter } from '../../data/protocols/encrypter/encrypter'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const encryptedValue = await bcrypt.hash(value, 10)
    return encryptedValue
  }

  async checkEncryption (value: string, encryptedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, encryptedValue)
    return isValid
  }
}
