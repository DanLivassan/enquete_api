import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) { }
    validate(data: any): Error | null {
        if (typeof data !== 'object' || !Object.keys(data).includes(this.fieldName))
            return new MissingParamError(`${this.fieldName} is required`)
        return null
    }
}
