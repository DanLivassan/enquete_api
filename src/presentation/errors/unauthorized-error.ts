export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized error: invalid credentials')
    this.name = 'UnauthorizedError'
  }
}
