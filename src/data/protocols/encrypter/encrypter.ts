export interface Encrypter {
  encrypt: (value: string) => Promise<string>
}

export interface HashCompare {
  checkEncryption: (value: string, encryptedValud: string) => Promise<boolean>
}
