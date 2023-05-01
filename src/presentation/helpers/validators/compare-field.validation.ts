import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldToCompareName: string) { }
  validate(data: any): Error | null {
    if (
      typeof data !== 'object' ||
      !Object.keys(data).includes(this.fieldName) ||
      !Object.keys(data).includes(this.fieldToCompareName)) {
      const isEqual = data[this.fieldName] !== data[this.fieldToCompareName]
      if (!isEqual)
        return new MissingParamError(`${this.fieldName} is required`)
    }
    return null
  }
}
