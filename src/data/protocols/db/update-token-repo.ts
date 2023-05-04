export interface UpdateTokenRepository {
  update: (accountId: string, token: string) => Promise<void>
}
