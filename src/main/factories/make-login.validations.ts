import { EmailValidation } from '../../presentation/helpers/validators/email.validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field.validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeLoginValidations = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter()
  return new ValidationComposite(
    [
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation('email', emailValidator),
    ]
  )
}
