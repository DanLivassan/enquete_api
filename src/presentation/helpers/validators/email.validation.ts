import { EmailValidator } from '../../../protocol/email-validator'
import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class EmailValidation implements Validation {
    constructor(private readonly fieldName: string, private readonly emailValidator: EmailValidator) { }
    validate(data: any): Error | null {
        if (typeof data === 'object') {
            const isValid = this.emailValidator.isValid(data[this.fieldName])
            if (!isValid) {
                return new InvalidParamError(`The field ${this.fieldName} is not a valid email`)
            }
        }
        return null
    }
}
