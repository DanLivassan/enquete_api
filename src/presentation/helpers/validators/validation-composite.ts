import { Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: Validation[]) {

  }

  validate (data: any): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(data)
      if (error != null) return error
    }
    return null
  }
}
