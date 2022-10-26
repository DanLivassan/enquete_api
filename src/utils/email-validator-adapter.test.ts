import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
const makeSut = (): { emailValidatorAdapter: EmailValidatorAdapter } => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return { emailValidatorAdapter }
}
describe('Email validator adapter', () => {
  test('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const { emailValidatorAdapter } = makeSut()
    expect(emailValidatorAdapter.isValid('email@email.com')).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const { emailValidatorAdapter } = makeSut()
    expect(emailValidatorAdapter.isValid('email@email.com')).toBe(true)
  })

  test('should call validator with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const { emailValidatorAdapter } = makeSut()
    emailValidatorAdapter.isValid('email@email.com')
    expect(isEmailSpy).toBeCalledWith('email@email.com')
  })
})
