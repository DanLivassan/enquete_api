export class ServerError extends Error {
  constructor (paramName: string) {
    super(`Server error: ${paramName}`)
    this.name = 'ServerError'
  }
}
