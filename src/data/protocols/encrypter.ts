export interface Encrypter {
  encrypt: (value: string) => Promise<string>
  checkEncryption: (value: string, encryptedValud: string) => Promise<boolean>
}
