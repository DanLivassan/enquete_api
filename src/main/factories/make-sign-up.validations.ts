import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-field.validation'
import { EmailValidation } from '../../presentation/helpers/validators/email.validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field.validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpValidations = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  return new ValidationComposite(
    [
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),
      new EmailValidation('email', emailValidator),
      new CompareFieldsValidation('passowrd', 'passwordConfirmation')
    ]
  )
}
